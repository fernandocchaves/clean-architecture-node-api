import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelpers';
import { AuthMiddleware } from './AuthMiddleware';
import { AccountModel } from '../../domain/models/Account';
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken';
import { HttpRequest } from '../protocols';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'hashed_password',
});

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }

  return new LoadAccountByTokenStub();
};

interface SutTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);

  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
