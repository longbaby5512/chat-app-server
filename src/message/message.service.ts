import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  async findAllMessagesByUserId(
    userId: number,
    relations?: string[],
    throws?: boolean,
  ) {
    return await this.messageRepository.findAllMessageByUserId(
      userId,
      relations,
      throws,
    );
  }

  async findAllMessageBeetweenTwoUser(
    userId1: number,
    userId2: number,
    relations?: string[],
    throws?: boolean,
  ) {
    return await this.messageRepository.findAllMessageBeetweenTwoUser(
      userId1,
      userId2,
      relations,
      throws,
    );
  }

  async create(inputs: SendMessageDto) {
    return await this.messageRepository.createEntity(inputs);
  }

  async delete(id: number) {
    return await this.messageRepository.deleteEntityById(id);
  }
}
