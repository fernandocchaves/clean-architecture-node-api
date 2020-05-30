import { HttpResponse } from '../protocols/Http';

export const BadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
