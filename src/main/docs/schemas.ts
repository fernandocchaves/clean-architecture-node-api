import {
  AccountSchema,
  LoginParamsSchema,
  ErrorSchema,
  SurveySchema,
  SurveysSchema,
  SurveyAnswerSchema,
  SignUpParamsSchema,
  AddSurveyParamsSchema,
  SaveSurveyParamsSchema,
  SurveyResultSchema,
  SurveyResultAnswerSchema,
} from './schemas/';

export default {
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
};
