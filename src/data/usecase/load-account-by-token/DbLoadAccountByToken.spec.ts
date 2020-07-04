import { Decrypter } from '../../protocols/criptography/Decrypter';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';

describe('LoadAccountByToken Usecade', () => {
  test('Should call Decrypter  with correct values', async () => {
    class DescrypterStub implements Decrypter {
      async decrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('any_value'));
      }
    }

    const decrypterStub = new DescrypterStub();
    const sut = new DbLoadAccountByToken(decrypterStub);
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
