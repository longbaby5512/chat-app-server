import { Nullable } from '../../common/type';
export interface IUser {
  id: number;
  name: Nullable<string>;
  email: string;
  password: string;
  salt: string;
}
