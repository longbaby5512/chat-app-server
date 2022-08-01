import { ModelEntity } from '../../base/model.serializer';
import { IConversation } from '../interfaces/conversation.interface';
import { MessageType } from '../../message/interfaces/message.interface';

export class ConversationEntity extends ModelEntity implements IConversation {
  id: number;
  userId: number;
  toUserId: number;
  toUserName: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}
