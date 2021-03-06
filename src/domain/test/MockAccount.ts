import { AccountModel } from '@/domain/models/Account';
import { AddAccountParams } from '@/domain/usecases/account/AddAccount';
import { AuthenticationParams } from '@/domain/usecases/account/Authentication';
import faker from 'faker';

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
