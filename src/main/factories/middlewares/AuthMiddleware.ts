import { Middleware } from '@/presentation/protocols';
import { AuthMiddleware } from '@/presentation/middlewares/AuthMiddleware';
import { makeDbLoadAccountByToken } from '@/main/factories/usecase/account/load-account-by-token/DbLoadccountByTokenFactory';

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
