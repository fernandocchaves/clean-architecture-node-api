import { Router } from 'express';
import { adapterRoute } from '@/main/adapters/ExpressRoutesAdapter';
import { auth } from '@/main/middlewares/Auth';
import { makeSaveSurveyResultContoller } from '@/main/factories/controllers/survey-result/save-survey-result/SaveSurveyResultControllerFactory';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adapterRoute(makeSaveSurveyResultContoller()),
  );
};
