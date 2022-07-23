import { Hashing } from './hash';
import { HttpException, HttpStatus } from '@nestjs/common';

const throwNotFound = <T>(value: T, res: string) => {
  if (!value) {
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
};

const verifyPassword = async (password: string, hashPassword: string) => {
  const isValid = await Hashing.comparing(password, hashPassword);
  if (!isValid) {
    throw new HttpException(
      'Email or password incorrect',
      HttpStatus.UNAUTHORIZED,
    );
  }
};

export { throwNotFound, verifyPassword };
