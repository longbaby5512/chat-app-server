import { AuthPayload } from '../interfaces/auth-payload.interface';
import { AuthService } from '../auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { throwNotFound } from '../../common/utils';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      algorithms: configService.get('JWT_ALGORITHM'),
    });
  }

  async validate(payload: AuthPayload) {
    const user = await this.userService.findById(payload.id);
    throwNotFound(user, `User with id ${payload.id} not found`);
    return user;
  }
}
