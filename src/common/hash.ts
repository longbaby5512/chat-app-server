import { createHash, pseudoRandomBytes } from 'crypto';

export interface SaltedHash {
  hash: string;
  salt: string;
}

const randomNumber = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export class Hashing {
  static hash = async (value: string): Promise<SaltedHash> => {
    const saltHex = pseudoRandomBytes(randomNumber(16, 32)).toString('hex');
    const valueHex = Buffer.from(value, 'utf8').toString('hex');
    const hash = createHash('sha256');
    hash.update(saltHex);
    hash.update(valueHex);
    return {
      hash: hash.digest('hex'),
      salt: saltHex,
    };
  };

  static compare = async (value: string, saltedHash: SaltedHash) => {
    const valueHex = Buffer.from(value, 'utf8').toString('hex');
    const hash = createHash('sha256');
    hash.update(saltedHash.salt);
    hash.update(valueHex);
    return hash.digest('hex') === saltedHash.hash;
  };
}
