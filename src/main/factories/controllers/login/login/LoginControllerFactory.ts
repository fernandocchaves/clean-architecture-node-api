import { Controller } from '@/presentation/protocols';
import { LoginController } from '@/presentation/controllers/login/login/LoginController';
import { makeLoginValidation } from './LoginValidationFactory';
import { makeDbAuthentication } from '@/main/factories/usecase/account/authentication/DbAuthenticationFactory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';

export const makeLoginContoller = (): Controller => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecorator(controller);
};
