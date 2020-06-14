import { makeSignUpValidation } from './SignUpValidations';
import { ValidationComposite } from '../../presentation/helpers/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validations/RequiredFieldValidation';
import { Validation } from '../../presentation/helpers/validations/Validation';
import { CompareFieldValidation } from '../../presentation/helpers/validations/CompareFieldValidation';
import { EmailValidation } from '../../presentation/helpers/validations/EmailValidation';
import { EmailValidator } from '../../presentation/protocols/EmailValidator';

jest.mock('../../presentation/helpers/validations/ValidationComposite');

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
