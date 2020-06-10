import { SignUpController } from '../presentation/controllers/signup/SignUp';
import { EmailValidatorAdapter } from '../utils/EmailValidatorAdapter';
import { DbAddAccount } from '../data/usecase/account/DbAddAccount';
import { BcryptAdapter } from '../infra/criptography/BcryptAdapter';
import { AccountMongoRepository } from '../infra/db/mongodb/account-repository/Account';

export const makeSignUpContoller = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter();

  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount,
  );

  return signUpController;
};
