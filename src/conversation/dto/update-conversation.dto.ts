import { MessageType } from '../../message/interfaces/message.interface';

export interface UpdateConversationDto {
  content: string;
  type: MessageType;
  timestamp: Date;
}
