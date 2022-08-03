import { Exclude } from 'class-transformer';
import { Information } from '../../information/entities/information.entity';
import { IUser } from '../interfaces/user.interface';
import { Key } from '../interfaces/key.interface';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  @Index({ unique: true })
  id: number;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ length: 255, nullable: false, unique: true })
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Exclude()
  password: string;

  @Column({
    name: 'key',
    type: 'jsonb',
    nullable: true,
    default: null,
  })
  key: Key;

  @OneToMany(() => Information, (information) => information.user, {
    eager: true,
  })
  informations?: Information[];

  @Column({
    name: 'refresh_token',
    type: 'text',
    nullable: true,
  })
  @Exclude()
  refreshToken?: string;
}
