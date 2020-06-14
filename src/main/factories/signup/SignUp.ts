import { SignUpController } from '../../../presentation/controllers/signup/SignUp';
import { DbAddAccount } from '../../../data/usecase/account/DbAddAccount';
import { BcryptAdapter } from '../../../infra/criptography/BcryptAdapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/Account';
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/LogMongoRepository';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decoratos/log';
import { makeSignUpValidation } from './SignUpValidation';

export const makeSignUpContoller = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const logMongoRepository = new LogMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);

  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation(),
  );

  return new LogControllerDecorator(signUpController, logMongoRepository);
};
