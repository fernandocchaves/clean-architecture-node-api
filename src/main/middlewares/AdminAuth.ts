import { adapterMiddleware } from '@/main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddleware';

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));
