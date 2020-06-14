import { Router } from 'express';
import { makeSignUpContoller } from '../factories/signup/SignUp';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpContoller()));
};
