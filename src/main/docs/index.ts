import { LoginPath } from './paths/LoginPath';
import { AccountSchema } from './schemas/AccountSchema';
import { LoginParamsSchema } from './schemas/LoginParamsSchema';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description:
      'API do curso do Mango para realizar enquete entre programadores',
    version: '1.0.0',
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Login' }],
  paths: {
    '/login': LoginPath,
  },
  schemas: {
    account: AccountSchema,
    loginParams: LoginParamsSchema,
  },
};
