import { MessageType } from '../../message/interfaces/message.interface';

export interface IConversation {
  id: number;
  userId: number;
  toUserId: number;
  content: string;
  type: MessageType;
  timestamp: Date;
}
