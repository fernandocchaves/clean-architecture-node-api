import { SignUpController } from '@/presentation/controllers/login/signup/SignUpController';
import { Controller } from '@/presentation/protocols';
import { makeSignUpValidation } from './SignUpValidationFactory';
import { makeDbAuthentication } from '@/main/factories/usecase/account/authentication/DbAuthenticationFactory';
import { makeDbAddAccount } from '@/main/factories/usecase/account/add-account/DbAddAccountFactory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';

export const makeSignUpContoller = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );

  return makeLogControllerDecorator(controller);
};
