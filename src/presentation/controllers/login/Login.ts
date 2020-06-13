import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/HttpHelpers';
import { EmailValidator } from '../signup/SignUpProtocols';
import { Authentication } from '../../../domain/usecases/Authentication';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return new Promise(resolve =>
          resolve(badRequest(new MissingParamError('email'))),
        );
      }

      if (!password) {
        return new Promise(resolve =>
          resolve(badRequest(new MissingParamError('password'))),
        );
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return new Promise(resolve =>
          resolve(badRequest(new InvalidParamError('email'))),
        );
      }

      await this.authentication.auth(email, password);
    } catch (error) {
      return serverError(error);
    }
  }
}
