import { IInformation } from '../interfaces/information.interface';
import { User } from '../../user/entities/user.entity';
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('informations')
export class Information implements IInformation {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({
    nullable: true,
    name: 'user_id',
  })
  @RelationId((information: Information) => information.user)
  @Index()
  userId: number;

  @Column('text', {
    nullable: true,
    name: 'socket_id',
  })
  socketId: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.informations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
