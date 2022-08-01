import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Log } from '../common/logger';
import { throwNotFound } from '../common/utils';
import { UserEntity } from './serializers/user.serializer';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@GetUser() currentUser: UserEntity) {
    const users = await this.userService.findAll();
    users.forEach((user) => {
      user.password = undefined;
      user.publicKey = user.key.publicKey;
      user.key = undefined;
      user.informations = undefined;
      user.refreshToken = undefined;
      user.createType = undefined;
    });
    return users.filter((user) => user.id !== currentUser.id);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    throwNotFound(user, 'User not found');
    user.password = undefined;
    user.publicKey = user.key.publicKey;
    user.key = undefined;
    user.informations = undefined;
    user.refreshToken = undefined;
    user.createType = undefined;
    return user;
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    throwNotFound(user, 'User not found');
    user.password = undefined;
    user.publicKey = user.key.publicKey;
    user.key = undefined;
    user.informations = undefined;
    user.refreshToken = undefined;
    user.createType = undefined;
    return user;
  }
}
