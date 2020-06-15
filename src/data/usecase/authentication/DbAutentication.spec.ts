import { AccountModel } from '../../../domain/models/Account';
import { LoadAccountByEmailRepository } from '../../protocols/LoadAccountByEmailRepository';
import { DbAuthentication } from './DbAuthentication';
import { AuthenticationModel } from '../../../domain/usecases/Authentication';

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

interface SutTypes {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);

  return {
    sut,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DBAuthentication', () => {
  test('Should call LoadAccountByEmailRepository if correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
