import { getCurves } from 'crypto';
import { createECDH, createHash, ECDH } from 'crypto'
import { Key } from '../user/interfaces/key.interface'
import { Log } from './logger';

export class ECDHService {
  private readonly ecdh: ECDH;

  constructor() {
    getCurves().forEach((curve) => {
      Log.info(ECDHService.name, `Found curve ${curve}`);
    });
    this.ecdh = createECDH('secp256k1');
  }

  generateKeys(): Key {
    this.ecdh.generateKeys('base64url', 'compressed');
    return {
      publicKey: this.ecdh.getPublicKey('base64url', 'compressed'),
      privateKey: this.ecdh.getPrivateKey('base64url'),
    };
  }

  static generateSharedSecret(ourPrivateKey: string, theirPublicKey: string) {
    const ecdh = createECDH('secp256k1');
    ecdh.setPrivateKey(Buffer.from(ourPrivateKey, 'base64url'));
    return ecdh.computeSecret(theirPublicKey, 'base64url', 'base64url')
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
