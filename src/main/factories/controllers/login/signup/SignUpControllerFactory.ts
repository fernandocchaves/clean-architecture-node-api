import { SignUpController } from '../../../../../presentation/controllers/login/signup/SignUpController';
import { Controller } from '../../../../../presentation/protocols';
import { makeSignUpValidation } from './SignUpValidationFactory';
import { makeDbAuthentication } from '../../../usecase/account/authentication/DbAuthenticationFactory';
import { makeDbAddAccount } from '../../../usecase/account/add-account/DbAddAccountFactory';
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';

export const makeSignUpContoller = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );

  return makeLogControllerDecorator(controller);
};
