import { Router } from 'express';
import { adapterRoute } from '@/main/adapters/ExpressRoutesAdapter';
import { makeAddSurveyContoller } from '@/main/factories/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeLoadSurveyContoller } from '@/main/factories/controllers/survey/load-survey/LoadSurveyControllerFactory';
import { adminAuth } from '@/main/middlewares/AdminAuth';
import { auth } from '@/main/middlewares/Auth';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyContoller()));
  router.get('/surveys', auth, adapterRoute(makeLoadSurveyContoller()));
};
