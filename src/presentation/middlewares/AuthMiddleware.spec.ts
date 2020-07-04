import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelpers';
import { AuthMiddleware } from './AuthMiddleware';
import { AccountModel } from '../../domain/models/Account';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'hashed_password',
});

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByTokenStub {
      async load(accessToken: string, role?: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()));
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub();

    const sut = new AuthMiddleware(loadAccountByTokenStub);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByTokenStub {
      async load(accessToken: string, role?: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()));
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

    const sut = new AuthMiddleware(loadAccountByTokenStub);
    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
