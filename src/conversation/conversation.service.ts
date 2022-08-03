import { ConversationEntity } from './serializers/conversation.serializer';
import { ConversationRepository } from './conversation.repository';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../common/logger';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationRepository)
    private readonly conversationRepository: ConversationRepository,
    private readonly userService: UserService,
  ) {}

  async findAllConversationByUserId(userId: number) {
    return await this.conversationRepository.findAllConversationByUserId(
      userId,
    );
  }

  async update(
    userId: number,
    toUserId: number,
    inputs: UpdateConversationDto,
  ) {
    const conversation = await this.conversationRepository.findOne({
      where: [
        {
          userId,
          toUserId,
        },
        {
          userId: toUserId,
          toUserId: userId,
        },
      ],
    });
    Log.logObject(ConversationService.name, conversation);
    if (!conversation) {
      const createConversation: CreateConversationDto = {
        userId,
        toUserId,
        content: inputs.content,
        type: inputs.type,
        timestamp: inputs.timestamp,
      };
      return await this.conversationRepository.createEntity(createConversation);
    }
    return await this.conversationRepository.updateEntity(conversation, inputs);
  }
}
