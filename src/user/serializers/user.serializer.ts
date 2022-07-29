import { Information } from '../../information/entities/information.entity';
import { IUser, UserCreateType } from '../interfaces/user.interface';
import { Key } from '../interfaces/key.interface';
import { ModelEntity } from '../../base/model.serializer';
export class UserEntity extends ModelEntity implements IUser {
  id: number;
  name: string;
  email: string;
  password: string;

  key: Key;

  createType: UserCreateType;

  informations?: Information[];

  refreshToken?: string;
}
