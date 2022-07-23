import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { throwNotFound } from 'src/common/utils';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import { Request } from 'express';
import { Hashing } from 'src/common/hash';
import { Log } from '../../common/logger';

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
    const isValid = await Hashing.comparing(refreshToken,user.refreshToken);
    if (!isValid) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    user.refreshToken = refreshToken;
    return user;
  }
}
