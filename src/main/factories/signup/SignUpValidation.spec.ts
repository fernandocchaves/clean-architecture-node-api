import { makeSignUpValidation } from './SignUpValidation';
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldValidation,
  EmailValidation,
} from '../../../presentation/helpers/validations';
import { Validation } from '../../../presentation/protocols/Validation';
import { EmailValidator } from '../../../presentation/protocols/EmailValidator';

jest.mock('../../../presentation/helpers/validations/ValidationComposite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('SignUpValidation', () => {
  test('Should call ValidationComposite with all ValidationComposite', () => {
    makeSignUpValidation();

    const validations: Validation[] = [];

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation'),
    );

    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
