import { Router } from 'express';
import { adapterRoute } from '../adapters/express/ExpressRoutesAdapter';
import { makeAddSurveyContoller } from '../factories/controllers/add-survey/AddSurveyControllerFactory';

export default (router: Router): void => {
  router.post('/surveys', adapterRoute(makeAddSurveyContoller()));
};
