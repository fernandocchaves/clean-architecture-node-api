import { Middleware, HttpRequest, HttpResponse } from '../protocols';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelpers';

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError());
    return new Promise(resolve => resolve(error));
  }
}
