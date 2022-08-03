import { IConversation } from '../interfaces/conversation.interface';
import { MessageType } from '../../message/interfaces/message.interface';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('conversations')
export class Conversation implements IConversation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'to_user_id',
    nullable: false,
  })
  toUserId: number;

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

  @Column({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
