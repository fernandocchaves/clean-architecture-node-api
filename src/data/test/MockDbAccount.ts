import { mockAccountModel } from '@/domain/test';
import { AddAccountRepository } from '@/data/protocols/db/account/AddAccountRepository';
import { LoadAccountByTokenRepository } from '@/data/usecase/account/load-account-by-token/DbLoadAccountByTokenProtocols';
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/UpdateAccessTokenRepository';
import {
  AddAccountParams,
  AccountModel,
  LoadAccountByEmailRepository,
} from '@/data/usecase/account/add-account/DbAddAccountProtocols';

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel();
  addAccountParams: AddAccountParams;

  async add(data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data;
    return Promise.resolve(this.accountModel);
  }
}

export class LoadAccountByEmailRepositorySpy
  implements LoadAccountByEmailRepository {
  accountModel = mockAccountModel();
  email: string;

  async loadByEmail(email: string): Promise<AccountModel> {
    this.email = email;
    return Promise.resolve(this.accountModel);
  }
}

export class LoadAccountByTokenRepositorySpy
  implements LoadAccountByTokenRepository {
  accountModel = mockAccountModel();
  token: string;
  role: string;

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    this.token = token;
    this.role = role;
    return Promise.resolve(this.accountModel);
  }
}

export class UpdateAccessTokenRepositorySpy
  implements UpdateAccessTokenRepository {
  id: string;
  token: string;

  async updateAccessToken(id: string, token: string): Promise<void> {
    this.id = id;
    this.token = token;
    return Promise.resolve();
  }
}
