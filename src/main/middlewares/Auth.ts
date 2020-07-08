import { adapterMiddleware } from '@/main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddleware';

export const auth = adapterMiddleware(makeAuthMiddleware());
