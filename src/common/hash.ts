import { hash, genSalt, compare } from 'bcrypt';

// String array to number by xor
const genNumber = (str: string): number => {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num ^= str.charCodeAt(i);
  }
  return num;
};

export class Hashing {
  static hashing = async (value: string, salt: string): Promise<string> => {
    const saltBcrypt = await genSalt(genNumber(salt));
    return await hash(value, saltBcrypt);
  };

  static comparing = async (value: string, hashValue: string) => {
    return await compare(value, hashValue);
  };
}
