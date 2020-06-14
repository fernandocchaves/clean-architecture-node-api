import { ValidationComposite } from '../../../presentation/helpers/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/RequiredFieldValidation';
import { Validation } from '../../../presentation/helpers/validations/Validation';
import { EmailValidation } from '../../../presentation/helpers/validations/EmailValidation';
import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
