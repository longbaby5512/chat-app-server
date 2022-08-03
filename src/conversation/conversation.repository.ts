import { Conversation } from './entities/conversation.entity';
import { ConversationEntity } from './serializers/conversation.serializer';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { ModelRepository } from '../base/model.repostitory';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Conversation)
export class ConversationRepository extends ModelRepository<
  Conversation,
  ConversationEntity
> {
  async findAllConversationByUserId(userId: number) {
    return await this.find({
      where: [
        {
          userId,
        },
        {
          toUserId: userId,
        },
      ],
    }).then((entities) => {
      if (!entities) {
        return Promise.reject(new NotFoundException('No models found'));
      }
      return this.transformMany(entities);
    });
  }
}
