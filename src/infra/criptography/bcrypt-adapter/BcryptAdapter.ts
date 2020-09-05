import bcrypt from 'bcrypt';
import { Hasher } from '@/data/protocols/criptography/Hasher';
import { HashComparer } from '@/data/protocols/criptography/HashComparer';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    const digest = await bcrypt.hash(plaintext, this.salt);
    return digest;
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plaintext, digest);
    return isValid;
  }
}
