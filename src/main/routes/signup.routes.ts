import { Router } from 'express';
import { makeSignUpContoller } from '../factories/signup/SignUpFactory';
import { adapterRoute } from '../adapters/ExpressRoutesAdapter';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpContoller()));
};
