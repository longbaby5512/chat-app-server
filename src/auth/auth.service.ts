import { AuthPayload } from './interfaces/auth-payload.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ECDHService } from '../common/ecdh';
import { Hashing } from '../common/hash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Key } from '../user/interfaces/key.interface';
import { Log } from '../common/logger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { PostgresErrorCode } from '../database/error/postgres-error-code';
import { throwNotFound, verifyPassword } from '../common/utils';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(inputs: CreateUserDto) {
    const email = inputs.email.toLowerCase().trim();
    const name = inputs.name;
    const { hash: hashPass, salt } = await Hashing.hash(inputs.password);
    const create = { name, email, password: hashPass, salt };
    try {
      const user = await this.userService.create(create);
      Log.log(AuthService.name, `User ${user.email} created`);
      throwNotFound(user, `User ${user.email} already exists`);
      return user;
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
    Log.logObject(AuthService.name, user);
    throwNotFound(user, `Email ${email} not found`);
    await verifyPassword(inputs.password, {
      hash: user.password,
      salt: user.salt,
    });
    if (!user.key) {
      const updateUser: User = {
        id: user.id,
        key: inputs.key,
        name: user.name,
        email: user.email,
        password: user.password,
        salt: user.salt,
        informations: user.informations,
      };
      return await this.userService.update(user, updateUser);
    }
    Log.log(AuthService.name, `User ${user.email} signed in`);
    return user;
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
}
