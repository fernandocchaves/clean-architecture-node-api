import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/AccountMongoRepository';
import { LoadAccountByToken } from '../../../../../domain/usecases/LoadAccountByToken';
import { DbLoadAccountByToken } from '../../../../../data/usecase/load-account-by-token/DbLoadAccountByToken';
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/JwtAdapter';
import env from '../../../../config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
