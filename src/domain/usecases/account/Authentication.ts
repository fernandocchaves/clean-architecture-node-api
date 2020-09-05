import { AuthenticationModel } from '@/domain/models/Authentication';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export type Authentication = {
  auth(
    authenticationParams: AuthenticationParams,
  ): Promise<AuthenticationModel>;
};
