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

export function getMessageType(val: string) {
  if (val === 'text') {
    return MessageType.TEXT;
  }
  if (val === 'image') {
    return MessageType.IMAGE;
  }

  if (val === 'file') {
    return MessageType.FILE;
  }

  if (val === 'video') {
    return MessageType.VIDEO;
  }

  if (val === 'audio') {
    return MessageType.AUDIO;
  }

  return MessageType.TEXT;
}
