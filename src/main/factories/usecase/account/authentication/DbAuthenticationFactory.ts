import env from '../../../../config/env';
import { DbAuthentication } from '../../../../../data/usecase/authentication/DbAuthentication';
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/AccountMongoRepository';
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/BcryptAdapter';
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/JwtAdapter';
import { Authentication } from '../../../../../domain/usecases/Authentication';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(Number(salt));
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
