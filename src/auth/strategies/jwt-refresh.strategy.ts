import { AuthPayload } from '../interfaces/auth-payload.interface';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Hashing } from 'src/common/hash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Log } from '../../common/logger';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { throwNotFound } from 'src/common/utils';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
      algorithms: configService.get('JWT_ALGORITHM'),
    });
  }

  async validate(request: Request, payload: AuthPayload) {
    const user = await this.userService.findById(payload.id);
    throwNotFound(user, `User ${payload.id} not found`);
    const refreshToken = request
      .get('Authorization')
      .replace('Bearer', '')
      .trim();
    Log.log(JwtRefreshStrategy.name, refreshToken);
    Log.log(JwtRefreshStrategy.name, user.refreshToken);
    const isValid = await Hashing.comparing(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    user.refreshToken = refreshToken;
    return user;
  }
}
