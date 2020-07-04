import { Middleware, HttpRequest, HttpResponse } from '../protocols';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelpers';
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];

    if (accessToken) {
      await this.loadAccountByToken.load(accessToken);
    }

    return forbidden(new AccessDeniedError());
  }
}
