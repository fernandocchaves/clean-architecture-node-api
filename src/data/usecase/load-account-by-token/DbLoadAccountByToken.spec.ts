import { Decrypter } from '../../protocols/criptography/Decrypter';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';

const makeDecrypter = (): Decrypter => {
  class DescrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'));
    }
  }

  return new DescrypterStub();
};

interface SutTypes {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);

  return {
    sut,
    decrypterStub,
  };
};

describe('LoadAccountByToken Usecade', () => {
  test('Should call Decrypter  with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
