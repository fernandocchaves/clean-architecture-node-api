import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/AddSurveyController';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';
import { makeDbAddSurvey } from '@/main/factories/usecase/survey/add-survey/DbAddSurveyFactory';

export const makeAddSurveyContoller = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );
  return makeLogControllerDecorator(controller);
};
