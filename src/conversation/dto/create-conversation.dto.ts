import { MessageType } from '../../message/interfaces/message.interface';

export interface CreateConversationDto {
  userId: number;
  toUserId: number;
  content: string;
  type: MessageType;
  timestamp: Date;
}
