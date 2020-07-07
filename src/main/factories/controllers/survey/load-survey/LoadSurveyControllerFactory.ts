import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';
import { LoadSuveysController } from '../../../../../presentation/controllers/survey/load-survey/LoadSuveysController';
import { makeDbLoadSurvey } from '../../../usecase/survey/load-survey/DbLoadSurveysFactory';

export const makeLoadSurveyContoller = (): Controller => {
  const controller = new LoadSuveysController(makeDbLoadSurvey());
  return makeLogControllerDecorator(controller);
};
