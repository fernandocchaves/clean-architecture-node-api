import { ApiKeyAuthSchema } from './schemas/';
import {
  BadRequest,
  Forbidden,
  NotFound,
  ServerError,
  Unauthorized,
} from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: ApiKeyAuthSchema,
  },
  badRequest: BadRequest,
  unauthorized: Unauthorized,
  notFound: NotFound,
  serverError: ServerError,
  forbidden: Forbidden,
};
