import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/MissingParamError';
import { BadRequest } from '../helpers/HttpHelpers';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['email', 'email'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field));
      }
    }
  }
}
