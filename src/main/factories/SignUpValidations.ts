import { ValidationComposite } from '../../presentation/helpers/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validations/RequiredFieldValidation';
import { Validation } from '../../presentation/helpers/validations/Validation';
import { CompareFieldValidation } from '../../presentation/helpers/validations/CompareFieldValidation';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation'),
  );
  return new ValidationComposite(validations);
};
