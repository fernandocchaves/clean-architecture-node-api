import { adapterMiddleware } from '../adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware';

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));
