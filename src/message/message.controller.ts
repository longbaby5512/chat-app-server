import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { MessageService } from './message.service';
import { UserEntity } from '../user/serializers/user.serializer';

@UseGuards(JwtGuard)
@Controller({
  version: '1',
  path: 'message',
})
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  async findAllMessageBeetweenTwoUser(
    @Param('id') id: number,
    @GetUser() user: UserEntity,
  ) {
    return await this.messageService.findAllMessageBeetweenTwoUser(id, user.id);
  }

  @Get()
  async findAllMessagesByUserId(user: UserEntity) {
    return await this.messageService.findAllMessagesByUserId(user.id);
  }
}
