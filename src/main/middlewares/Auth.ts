import { adapterMiddleware } from '../adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware';

export const auth = adapterMiddleware(makeAuthMiddleware());
