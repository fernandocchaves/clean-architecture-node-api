import { LoginPath, SurveysPath, SignUpPath, SurveyResultPath } from './paths/';

export default {
  '/login': LoginPath,
  '/signup': SignUpPath,
  '/surveys': SurveysPath,
  '/surveys/{surveyId}/results': SurveyResultPath,
};
