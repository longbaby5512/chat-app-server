import { AuthPayload } from './interfaces/auth-payload.interface'
import { ConfigService } from '@nestjs/config'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { Hashing } from '../common/hash'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Log } from '../common/logger'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { PostgresErrorCode } from '../database/error/postgres-error-code'
import { throwNotFound, verifyPassword } from '../common/utils'
import { User } from '../user/entities/user.entity'
import { UserEntity } from '../user/serializers/user.serializer'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(inputs: CreateUserDto) {
    const email = inputs.email.toLowerCase().trim();
    const name = inputs.name;
    const hashPassword = await Hashing.hashing(inputs.password, email);

    const create = { name, email, password: hashPassword, key: inputs.key };
    try {
      const user = await this.userService.create(create);
      Log.log(AuthService.name, `User ${user.email} created`);
      throwNotFound(user, `User ${user.email} already exists`);
      return;
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        Log.error(
          AuthService.name,
          `User with email ${inputs.email} already exists`,
        );
        throw new HttpException(
          `User with email ${inputs.email} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      Log.error(AuthService.name, 'Internal server error');
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(inputs: LoginUserDto) {
    const email = inputs.email.toLowerCase().trim();
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await verifyPassword(inputs.password, user.password);
    const refreshToken = await this.generateRefreshToken(user.id);
    const refreshTokenHash = await Hashing.hashing(refreshToken, email);
    Log.logObject(AuthService.name, user);

    Log.log(AuthService.name, `User ${user.email} signed in`);
    const res = await this.userService.update(user, {
      id: user.id,
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      informations: user.informations,
      refreshToken: refreshTokenHash,
    });
    res.refreshToken = refreshToken;
    Log.logObject(AuthService.name, res);
    return res;
  }

  async logout(user: UserEntity) {
    const updateUser: User = {
      id: user.id,
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      informations: user.informations,
      refreshToken: null,
    };
    Log.log(AuthService.name, `User ${user.email} signed out`);
    return await this.userService.update(user, updateUser);
  }

  async refreshToken(user: UserEntity) {
    const refreshToken = await this.generateRefreshToken(user.id);
    const token = await this.generateToken(user.id);

    const refreshTokenHash = await Hashing.hashing(refreshToken, user.email);
    const updateUser: User = {
      id: user.id,
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      refreshToken: refreshTokenHash,
    };
    Log.log(AuthService.name, `User ${user.email} refreshed`);
    const res = await this.userService.update(user, updateUser);
    res.refreshToken = refreshToken;
    return {
      ...res,
      token,
    };
  }

  async validateUser(payload: AuthPayload) {
    const user = await this.userService.findById(payload.id);
    throwNotFound(user, `User with id ${payload.id} not found`);
    return user;
  }

  async generateToken(userId: number) {
    const payload = { id: userId };
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(userId: number) {
    const payload = { id: userId };
    const options: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      algorithm: this.configService.get('JWT_ALGORITHM'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    };
    return await this.jwtService.signAsync(payload, options);
  }
}
