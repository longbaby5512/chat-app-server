import { createECDH, createHash, ECDH } from 'crypto'
import { Key } from '../user/interfaces/key.interface'

export class ECDHService {
  private readonly ecdh: ECDH;

  constructor() {
    this.ecdh = createECDH('secp256k1');
  }

  generateKeys(): Key {
    this.ecdh.generateKeys();
    return {
      publicKey: this.ecdh.getPublicKey().toString('hex'),
      privateKey: this.ecdh.getPrivateKey().toString('hex'),
    };
  }

  static generateSharedSecret(ourPrivateKey: string, theirPublicKey: string) {
    const ecdh = createECDH('secp256k1');
    ecdh.setPrivateKey(Buffer.from(ourPrivateKey, 'hex'));
    return ecdh
      .computeSecret(Buffer.from(theirPublicKey, 'hex'))
      .toString('hex');
  }

  static generateFinalKey(
    ourPublicKey: string,
    theirPublicKey: string,
    sharedSecret: string,
  ) {
    const hash = createHash('sha256');
    hash.update(sharedSecret);
    [theirPublicKey, ourPublicKey].sort().forEach((key) => {
      hash.update(key);
    });
    return hash.digest('hex');
  }
}
