import { makeSignUpValidation } from './SignUpValidations';
import { ValidationComposite } from '../../presentation/helpers/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validations/RequiredFieldValidation';
import { Validation } from '../../presentation/helpers/validations/Validation';

jest.mock('../../presentation/helpers/validations/ValidationComposite');

describe('SignUpValidation', () => {
  test('Should call ValidationComposite with all ValidationComposite', () => {
    makeSignUpValidation();

    const validations: Validation[] = [];

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
