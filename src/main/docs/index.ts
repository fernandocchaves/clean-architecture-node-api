import { LoginPath, SurveysPath, SignUpPath, SurveyResultPath } from './paths';
import {
  AccountSchema,
  LoginParamsSchema,
  ErrorSchema,
  SurveySchema,
  SurveysSchema,
  SurveyAnswerSchema,
  ApiKeyAuthSchema,
  SignUpParamsSchema,
  AddSurveyParamsSchema,
  SaveSurveyParamsSchema,
  SurveyResultSchema,
  SurveyResultAnswerSchema,
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
  tags: [{ name: 'Login' }, { name: 'Enquete' }],
  paths: {
    '/login': LoginPath,
    '/signup': SignUpPath,
    '/surveys': SurveysPath,
    '/surveys/{surveyId}/results': SurveyResultPath,
  },
  schemas: {
    account: AccountSchema,
    loginParams: LoginParamsSchema,
    signUpParams: SignUpParamsSchema,
    error: ErrorSchema,
    surveyAnswer: SurveyAnswerSchema,
    survey: SurveySchema,
    surveys: SurveysSchema,
    addSurveyParams: AddSurveyParamsSchema,
    saveSurveyParams: SaveSurveyParamsSchema,
    surveyResult: SurveyResultSchema,
    surveyResultAnswer: SurveyResultAnswerSchema,
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
