import { IMessage, MessageType } from '../interfaces/message.interface';
import { ModelEntity } from '../../base/model.serializer';

export class MessageEntity extends ModelEntity implements IMessage {
  id: number;
  from: number;
  to: number;
  content: string;
  type: MessageType;
  timestamp: number;
}
