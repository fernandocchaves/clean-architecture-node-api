import { Hasher } from '@/data/protocols/criptography/Hasher';
import { HashComparer } from '@/data/protocols/criptography/HashComparer';
import { Encrypter } from '@/data/protocols/criptography/Encrypter';
import { Decrypter } from '@/data/protocols/criptography/Decrypter';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }

  return new HasherStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  return new HashComparerStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new EncrypterStub();
};

export const mockDecrypter = (): Decrypter => {
  class DescrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value');
    }
  }

  return new DescrypterStub();
};
