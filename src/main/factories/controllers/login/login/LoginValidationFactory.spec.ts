import { makeLoginValidation } from './LoginValidationFactory';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validations';
import { Validation } from '@/presentation/protocols/Validation';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

jest.mock('@/validation/validations/ValidationComposite');

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
