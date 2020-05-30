import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/MissingParamError';
import { BadRequest } from '../helpers/HttpHelpers';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return BadRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return BadRequest(new MissingParamError('email'));
    }
  }
}
