import { IMessage, MessageType } from '../interfaces/message.interface'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class Message implements IMessage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
  })
  @Index()
  from: number;

  @Column({
    nullable: false,
  })
  @Index()
  to: number;

  @Column({
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
    enum: MessageType,
    default: MessageType.TEXT,
  })
  type: MessageType;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: number;
}
