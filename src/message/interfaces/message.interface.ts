export interface IMessage {
  id: number;
  from: number;
  to: number;
  content: string;
  type: MessageType;
  timestamp: number;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  VIDEO = 'video',
  AUDIO = 'audio',
}
