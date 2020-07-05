import { Router } from 'express';
import { makeSignUpContoller } from '../factories/controllers/login/signup/SignUpControllerFactory';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';
import { makeLoginContoller } from '../factories/controllers/login/login/LoginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpContoller()));
  router.post('/login', adapterRoute(makeLoginContoller()));
};
