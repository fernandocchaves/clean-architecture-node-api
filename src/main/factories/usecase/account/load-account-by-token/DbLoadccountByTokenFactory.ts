import { AccountMongoRepository } from '@/infra/db/mongodb/account/AccountMongoRepository';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/JwtAdapter';
import { LoadAccountByToken } from '@/domain/usecases/LoadAccountByToken';
import { DbLoadAccountByToken } from '@/data/usecase/load-account-by-token/DbLoadAccountByToken';
import env from '@/main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
