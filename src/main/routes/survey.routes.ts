import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';
import { makeAddSurveyContoller } from '../factories/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeLoadSurveyContoller } from '../factories/controllers/survey/load-survey/LoadSurveyControllerFactory';
import { adminAuth } from '../middlewares/AdminAuth';
import { auth } from '../middlewares/Auth';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyContoller()));
  router.get('/surveys', auth, adapterRoute(makeLoadSurveyContoller()));
};
