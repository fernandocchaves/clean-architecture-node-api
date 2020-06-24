import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/AddSurveyController';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';
import { makeDbAddSurvey } from '../../usecase/add-survey/DbAddSurveyFactory';

export const makeAddSurveyContoller = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );
  return makeLogControllerDecorator(controller);
};
