import { Hashing, SaltedHash } from './hash';
import { HttpException, HttpStatus } from '@nestjs/common';

const throwNotFound = <T>(value: T, res: string) => {
  if (!value) {
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
};

const verifyPassword = async (password: string, saltedHash: SaltedHash) => {
  const { hash, salt } = saltedHash;
  const isValid = await Hashing.compare(password, { hash, salt });
  if (!isValid) {
    throw new HttpException(
      'Email or password incorrect',
      HttpStatus.UNAUTHORIZED,
    );
  }
};

export { throwNotFound, verifyPassword };
