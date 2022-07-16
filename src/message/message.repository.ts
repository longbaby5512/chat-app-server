import { CustomRepository } from '../database/typeorm-ex.decorator'
import { Log } from '../common/logger'
import { Message } from './entities/message.entity'
import { MessageEntity } from './serializers/message.serializer'
import { ModelRepository } from '../base/model.repostitory'
import { NotFoundException } from '@nestjs/common'

@CustomRepository(Message)
export class MessageRepository extends ModelRepository<Message, MessageEntity> {
  async findAllMessageByUserId(
    userId: number,
    relations?: string[],
    throws?: boolean,
  ): Promise<MessageEntity[]> {
    let result: MessageEntity[] = [];
    await this.find({ where: { from: userId }, relations }).then((entities) => {
      if (!entities && throws) {
        return Promise.reject(new NotFoundException('No models found'));
      }
      // Log.logObject(MessageRepository.name, entities);
      const trans = this.transformMany(entities);
      result.push(...trans);
    });

    await this.find({ where: { to: userId }, relations }).then((entities) => {
      if (!entities && throws) {
        return Promise.reject(new NotFoundException('No models found'));
      }
      // Log.logObject(MessageRepository.name, entities);
      const trans = this.transformMany(entities);
      result.push(...trans);
    });

    return result;
  }
}
