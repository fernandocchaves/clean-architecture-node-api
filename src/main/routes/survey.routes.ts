import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';
import { makeAddSurveyContoller } from '../factories/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddleware';
import { adapterMiddleware } from '../adapters/ExpressMiddlewareAdapter';

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyContoller()));
};
