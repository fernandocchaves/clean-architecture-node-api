import faker from 'faker';
import { Hasher } from '@/data/protocols/criptography/Hasher';
import { HashComparer } from '@/data/protocols/criptography/HashComparer';
import { Encrypter } from '@/data/protocols/criptography/Encrypter';
import { Decrypter } from '@/data/protocols/criptography/Decrypter';

export class HasherSpy implements Hasher {
  digest = faker.random.uuid();
  plaintext: string;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return Promise.resolve(this.digest);
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string;
  digest: string;
  isValid = true;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return Promise.resolve(this.isValid);
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.random.uuid();
  plaintext: string;

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return Promise.resolve(this.ciphertext);
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password();
  ciphertext: string;

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext;
    return Promise.resolve(this.plaintext);
  }
}
