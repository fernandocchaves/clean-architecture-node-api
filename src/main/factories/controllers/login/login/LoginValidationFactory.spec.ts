import { makeLoginValidation } from './LoginValidationFactory';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '../../../../../validation/validations';
import { Validation } from '../../../../../presentation/protocols/Validation';
import { EmailValidator } from '../../../../../validation/protocols/EmailValidator';

jest.mock('../../../../../validation/validations/ValidationComposite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('LoginValidation', () => {
  test('Should call ValidationComposite with all ValidationComposite', () => {
    makeLoginValidation();

    const validations: Validation[] = [];

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
