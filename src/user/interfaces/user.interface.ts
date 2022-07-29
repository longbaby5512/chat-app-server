import { Nullable } from '../../common/type';
export interface IUser {
  id: number;
  name: Nullable<string>;
  email: string;
  password: string;
}

export enum UserCreateType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
}
