import { Key } from '../interfaces/key.interface'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @Matches('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?-@^_`|~]).{8,}$')
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  key: Key;
}
