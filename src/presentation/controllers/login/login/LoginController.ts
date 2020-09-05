import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  Authentication,
} from './LoginControllerProtocols';
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '@/presentation/helpers/http/HttpHelpers';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { email, password } = httpRequest.body;
      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });

      if (!authenticationModel) {
        return unauthorized();
      }

      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
