import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { Key } from '../../user/interfaces/key.interface';
import { Log } from '../../common/logger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string) {
    Log.logObject(AuthService.name, req.body);
    const key = JSON.parse(JSON.stringify(req.body)).key as Key;
    Log.logObject(AuthService.name, key);
    const inputs: LoginUserDto = { email, password, key };
    return await this.authService.login(inputs);
  }
}
