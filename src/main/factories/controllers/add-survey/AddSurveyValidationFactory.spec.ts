import { makeAddSurveyValidation } from './AddSurveyValidationFactory';
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../validation/validations';
import { Validation } from '../../../../presentation/protocols/Validation';

jest.mock('../../../../validation/validations/ValidationComposite');

describe('AddSurveyValidation', () => {
  test('Should call ValidationComposite with all ValidationComposite', () => {
    makeAddSurveyValidation();

    const validations: Validation[] = [];

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
