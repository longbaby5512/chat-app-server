import { AuthService } from './auth.service'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards
  } from '@nestjs/common'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { ECDHService } from '../common/ecdh'
import { GetUser } from './decorators/get-user.decorator'
import { JwtGuard } from './guards/jwt.guard'
import { LocalGuard } from './guards/local.guard'
import { Log } from '../common/logger'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { UserEntity } from '../user/serializers/user.serializer'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() inputs: CreateUserDto) {
    return await this.authService.register(inputs);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@GetUser() user: UserEntity) {
    const token = await this.authService.generateToken(user.id);
    user.password = undefined;
    user.salt = undefined;
    return { ...user, token };
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@GetUser() user: UserEntity) {
    user.password = undefined;
    user.salt = undefined;
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('finalkey')
  @HttpCode(HttpStatus.OK)
  async finalKey(@GetUser() user: UserEntity, @Query('theirPublicKey') theirPublicKey: string) {
    const secret = ECDHService.generateSharedSecret(user.key.privateKey, theirPublicKey)
    return ECDHService.generateFinalKey(user.key.publicKey, theirPublicKey, secret);
  }
}
