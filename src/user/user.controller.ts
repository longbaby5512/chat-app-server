import {
    Controller,
    Get,
    Param,
    UseGuards
    } from '@nestjs/common'
import { GetUser } from '../auth/decorators/get-user.decorator'
import { HttpException, HttpStatus } from '@nestjs/common'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { Log } from '../common/logger'
import { throwNotFound } from '../common/utils'
import { UserEntity } from './serializers/user.serializer'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll(@GetUser() currentUser: UserEntity) {
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

  @Get(':id')
  async findById(
    @GetUser() currentUser: UserEntity,
    @Param('id') id: number | string,
  ) {
    // Log.info(UserController.name, `findById: ${id}`);

    let user: UserEntity;
    // check if id is a number
    if (Number.isInteger(Number(id))) {
      if (currentUser.id === Number(id)) {
        throw new HttpException(
          'You cannot view your own profile',
          HttpStatus.FORBIDDEN,
        );
      }
      user = await this.userService.findById(parseInt(id.toString(), 10));
    }
    // check if id is a string
    else if (typeof id === 'string') {
      if (currentUser.email === id) {
        throw new HttpException(
          'You cannot view your own profile',
          HttpStatus.FORBIDDEN,
        );
      }
      user = await this.userService.findByEmail(id);
    }
    throwNotFound(user, `User don't exists`);
    user.password = undefined;
    user.salt = undefined;
    user.publicKey = user.key.publicKey;
    user.key = undefined;
    user.informations = undefined;
    return user;
  }
}
