import { compare, genSalt, hash } from 'bcrypt';
import { Log } from './logger';

// String array to number by xor
const genNumber = (str: string): number => {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num ^= str.charCodeAt(i);
  }
  // Make num between 8 and 12
  num = (num % 4) + 8;
  return num;
};

export class Hashing {
  static hashing = async (value: string, salt: string): Promise<string> => {
    const saltBcrypt = await genSalt(genNumber(salt));
    const hashBcrypt = await hash(value, saltBcrypt);
    Log.logObject(Hashing.name, {
      salt: saltBcrypt,
      hash: hashBcrypt,
    });
    return hashBcrypt;
  };

  static comparing = async (value: string, hashValue: string) => {
    return await compare(value, hashValue);
  };
}
