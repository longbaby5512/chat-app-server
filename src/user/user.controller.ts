import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Log } from '../common/logger';
import { throwNotFound } from '../common/utils';
import { UserEntity } from './serializers/user.serializer';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(
    @GetUser() currentUser: UserEntity,
    @Query() query: { id: number; email: string },
  ) {
    if (!query.id && !query.email) {
      return this.findAll(currentUser);
    }

    let user: UserEntity;
    if (query.id) {
      user = await this.userService.findById(query.id);
    }
    if (query.email) {
      user = await this.userService.findByEmail(query.email);
    }

    throwNotFound(user, `User don't exists`);
    user.password = undefined;
    user.salt = undefined;
    user.publicKey = user.key.publicKey;
    user.key = undefined;
    user.informations = undefined;
    return user;
  }

  async findAll(currentUser: UserEntity) {
    const users = await this.userService.findAll();
    users.forEach((user) => {
      user.password = undefined;
      user.salt = undefined;
      user.publicKey = user.key.publicKey;
      user.key = undefined;
      user.informations = undefined;
    });
    return users.filter((user) => user.id !== currentUser.id);
  }
}
