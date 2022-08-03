import { IConversation } from '../interfaces/conversation.interface';
import { MessageType } from '../../message/interfaces/message.interface';
import { ModelEntity } from '../../base/model.serializer';

export class ConversationEntity extends ModelEntity implements IConversation {
  id: number;
  userId: number;
  toUserId: number;
  content: string;
  type: MessageType;
  timestamp: Date;
}
