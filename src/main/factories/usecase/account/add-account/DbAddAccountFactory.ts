import { DbAddAccount } from '@/data/usecase/account/DbAddAccount';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/BcryptAdapter';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/AccountMongoRepository';
import { AddAccount } from '@/domain/usecases/AddAccount';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository,
  );
};
