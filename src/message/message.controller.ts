import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { MessageService } from './message.service';
import { UserEntity } from '../user/serializers/user.serializer';

@UseGuards(JwtGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAllMessageBeetweenTwoUser(
    @Query('id') id: number,
    @GetUser() user: UserEntity,
  ) {
    if (!id) {
      return await this.findAllMessagesByUserId(user);
    }
    return await this.messageService.findAllMessageBeetweenTwoUser(id, user.id);
  }

  async findAllMessagesByUserId(user: UserEntity) {
    return await this.messageService.findAllMessagesByUserId(user.id);
  }
}
