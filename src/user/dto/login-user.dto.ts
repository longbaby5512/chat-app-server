import { Key } from '../interfaces/key.interface';

export class LoginUserDto {
  email: string;
  password: string;
  key: Key;
}
