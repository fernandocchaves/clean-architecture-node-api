import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('BcryptAdapter', () => {
  const sut = makeSut();

  test('Should call bcrypt with correct values', async () => {
    const hasSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(hasSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on sucess', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');

    expect(hash).toBe('hashed_value');
  });

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut();

    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValue(new Promise((resolve, reject) => reject(new Error())));

    const promise = sut.encrypt('any_value');
    await expect(promise).rejects.toThrow();
  });
});
