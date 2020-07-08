import { Controller } from '@/presentation/protocols';
import { LoadSuveysController } from '@/presentation/controllers/survey/load-survey/LoadSuveysController';
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurvey } from '@/main/factories/usecase/survey/load-survey/DbLoadSurveysFactory';

export const makeLoadSurveyContoller = (): Controller => {
  const controller = new LoadSuveysController(makeDbLoadSurvey());
  return makeLogControllerDecorator(controller);
};
