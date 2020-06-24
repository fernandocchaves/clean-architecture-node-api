import {
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../validation/validations';

import { Validation } from '../../../../presentation/protocols/Validation';

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
