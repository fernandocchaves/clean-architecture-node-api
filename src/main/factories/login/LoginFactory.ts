import env from '../../config/env';
import { Controller } from '../../../presentation/protocols';
import { LoginController } from '../../../presentation/controllers/login/LoginController';
import { LogControllerDecorator } from '../../decoratos/LogControllerDecorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { DbAuthentication } from '../../../data/usecase/authentication/DbAuthentication';
import { makeLoginValidation } from './LoginValidationFactory';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/BcryptAdapter';
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/JwtAdapter';

export const makeLoginContoller = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(Number(salt));
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );

  const loginController = new LoginController(
    dbAuthentication,
    makeLoginValidation(),
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
