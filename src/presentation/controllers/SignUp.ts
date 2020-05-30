import { HttpRequest, HttpResponse } from '../protocols/Http';
import { MissingParamError } from '../errors/MissingParamError';
import { BadRequest } from '../helpers/HttpHelpers';
import { Controller } from '../protocols/Controller';

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field));
      }
    }
  }
}
