import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ECDHService } from '../common/ecdh';
import { GetUser } from './decorators/get-user.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { Log } from '../common/logger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserEntity } from '../user/serializers/user.serializer';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

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
    user.informations = undefined;
    return { ...user, token };
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@GetUser() user: UserEntity) {
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser() user: UserEntity) {
    if (!user.refreshToken) {
      throw new HttpException('User is not logged in', HttpStatus.UNAUTHORIZED);
    }
    await this.authService.logout(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@GetUser() user: UserEntity) {
    return await this.authService.refreshToken(user);
  }
}
