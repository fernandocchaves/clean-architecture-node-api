import { Router } from 'express';
import { makeSignUpContoller } from '../factories/signup/SignUpFactory';
import { adapterRoute } from '../adapters/express/ExpressRoutesAdapter';
import { makeLoginContoller } from '../factories/login/LoginFactory';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpContoller()));
  router.post('/login', adapterRoute(makeLoginContoller()));
};
