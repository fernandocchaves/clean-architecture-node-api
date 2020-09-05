import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/LoadSurveyResultController';
import { makeDbLoadSurveById } from '@/main/factories/usecase/survey/load-survey-by-id/DbLoadSurveyByIdFactory';
import { makeDbLoadSurveyResult } from '@/main/factories/usecase/survey-result/load-survey-result/DbLoadSurveyResultFactory';

export const makeLoadSurveyResultContoller = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
