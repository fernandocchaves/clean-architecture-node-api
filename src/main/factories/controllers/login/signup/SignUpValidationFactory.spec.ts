import { makeSignUpValidation } from './SignUpValidationFactory';
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldValidation,
  EmailValidation,
} from '@/validation/validations';
import { Validation } from '@/presentation/protocols/Validation';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

jest.mock('@/validation/validations/ValidationComposite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
