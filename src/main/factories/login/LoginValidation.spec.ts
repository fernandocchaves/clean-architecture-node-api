import { makeLoginValidation } from './LoginValidation';
import { ValidationComposite } from '../../../presentation/helpers/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/RequiredFieldValidation';
import { Validation } from '../../../presentation/protocols/Validation';
import { EmailValidation } from '../../../presentation/helpers/validations/EmailValidation';
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
