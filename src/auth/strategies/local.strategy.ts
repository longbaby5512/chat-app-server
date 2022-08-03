import { AuthService } from '../auth.service'
import { Injectable } from '@nestjs/common'
import { Key } from '../../user/interfaces/key.interface'
import { Log } from '../../common/logger'
import { LoginUserDto } from '../../user/dto/login-user.dto'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const inputs: LoginUserDto = { email, password };
    return await this.authService.login(inputs);
  }
}
