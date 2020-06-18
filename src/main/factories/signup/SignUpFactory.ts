import { SignUpController } from '../../../presentation/controllers/signup/SignUpController';
import { DbAddAccount } from '../../../data/usecase/account/DbAddAccount';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/BcryptAdapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decoratos/LogControllerDecorator';
import { makeSignUpValidation } from './SignUpValidationFactory';

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
