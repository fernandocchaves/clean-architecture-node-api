import jwt from 'jsonwebtoken';
import { Encrypter } from '@/data/protocols/criptography/Encrypter';
import { Decrypter } from '@/data/protocols/criptography/Decrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    const accessToken = await jwt.sign({ id: plaintext }, this.secret);
    return accessToken;
  }

  async decrypt(ciphertext: string): Promise<string> {
    const plaintext: any = await jwt.verify(ciphertext, this.secret);
    return plaintext;
  }
}
