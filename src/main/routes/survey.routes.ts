import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';
import { makeAddSurveyContoller } from '../factories/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware';
import { adapterMiddleware } from '../adapters/ExpressMiddlewareAdapter';
import { makeLoadSurveyContoller } from '../factories/controllers/survey/load-survey/LoadSurveyControllerFactory';

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));
  const auth = adapterMiddleware(makeAuthMiddleware('user'));

  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyContoller()));
  router.get('/surveys', auth, adapterRoute(makeLoadSurveyContoller()));
};
