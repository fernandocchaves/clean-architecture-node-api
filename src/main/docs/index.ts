import { LoginPath, SurveysPath, SignUpPath } from './paths';
import {
  AccountSchema,
  LoginParamsSchema,
  ErrorSchema,
  SurveySchema,
  SurveysSchema,
  SurveyAnswerSchema,
  ApiKeyAuthSchema,
  SignUpParamsSchema,
} from './schemas';
import {
  BadRequest,
  Forbidden,
  NotFound,
  ServerError,
  Unauthorized,
} from './components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description:
      'API do curso do Mango para realizar enquete entre programadores',
    version: '1.0.0',
    contact: {
      name: 'Fernando Cezar Chaves',
      email: 'fernandocchaves@gmail.com',
      url: 'https://www.linkedin.com/in/fernandocchaves',
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
    },
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Login' }, { name: 'Enquetes' }],
  paths: {
    '/login': LoginPath,
    '/signup': SignUpPath,
    '/surveys': SurveysPath,
  },
  schemas: {
    account: AccountSchema,
    loginParams: LoginParamsSchema,
    signUpParams: SignUpParamsSchema,
    error: ErrorSchema,
    surveyAnswer: SurveyAnswerSchema,
    survey: SurveySchema,
    surveys: SurveysSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: ApiKeyAuthSchema,
    },
    badRequest: BadRequest,
    unauthorized: Unauthorized,
    notFound: NotFound,
    serverError: ServerError,
    forbidden: Forbidden,
  },
};
