import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hasSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(hasSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
