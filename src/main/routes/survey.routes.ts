import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';
import { makeAddSurveyContoller } from '../factories/controllers/survey/add-survey/AddSurveyControllerFactory';

export default (router: Router): void => {
  router.post('/surveys', adapterRoute(makeAddSurveyContoller()));
};
