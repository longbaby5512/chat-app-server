import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserEntity } from '../user/serializers/user.serializer';

@UseGuards(JwtGuard)
@Controller({ version: '1', path: 'conversation' })
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  async findAllConversationByUserId(@GetUser() user: UserEntity) {
    return await this.conversationService.findAllConversationByUserId(user.id);
  }
}
