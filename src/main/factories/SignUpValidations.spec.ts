import { makeSignUpValidation } from './SignUpValidations';
import { ValidationComposite } from '../../presentation/helpers/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validations/RequiredFieldValidation';
import { Validation } from '../../presentation/helpers/validations/Validation';
import { CompareFieldValidation } from '../../presentation/helpers/validations/CompareFieldValidation';

jest.mock('../../presentation/helpers/validations/ValidationComposite');

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
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
