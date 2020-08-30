import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/account/AddAccount';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';
import { mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models/Account';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
    }
  }

  return new AddAccountStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
    }
  }

  return new LoadAccountByTokenStub();
};
