import { Router } from 'express';
import { makeSignUpContoller } from '@/main/factories/controllers/login/signup/SignUpControllerFactory';
import { adapterRoute } from '@/main/adapters/ExpressRoutesAdapter';
import { makeLoginContoller } from '@/main/factories/controllers/login/login/LoginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpContoller()));
  router.post('/login', adapterRoute(makeLoginContoller()));
};
