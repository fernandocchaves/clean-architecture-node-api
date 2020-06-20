import { Router } from 'express';
import { makeSignUpContoller } from '../factories/controllers/signup/SignUpControllerFactory';
import { adapterRoute } from '../adapters/express/ExpressRoutesAdapter';
import { makeLoginContoller } from '../factories/controllers/login/LoginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpContoller()));
  router.post('/login', adapterRoute(makeLoginContoller()));
};
