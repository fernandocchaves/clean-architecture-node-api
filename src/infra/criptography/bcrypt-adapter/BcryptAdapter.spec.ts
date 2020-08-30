import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_value');
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut();
      const hasSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');

      expect(hasSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return a valid hash on hash sucess', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');

      expect(hash).toBe('hashed_value');
    });

    test('Should throw if hash throws', async () => {
      const sut = makeSut();

      jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.reject(new Error()));

      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    test('Should return true when compare success', async () => {
      const sut = makeSut();
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(true);
    });

    test('Should return false when compare fail', async () => {
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false));
      const sut = makeSut();
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(false);
    });

    test('Should throw if compare throws', async () => {
      const sut = makeSut();

      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValue(Promise.reject(new Error()));

      const promise = sut.compare('any_value', 'any_hash');
      await expect(promise).rejects.toThrow();
    });
  });
});
