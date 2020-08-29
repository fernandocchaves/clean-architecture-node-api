import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/SaveSurveyResultController';
import { makeDbLoadSurveById } from '@/main/factories/usecase/survey/load-survey-by-id/DbLoadSurveyByIdFactory';
import { makeDbSaveSurveyResult } from '@/main/factories/usecase/survey-result/save-survey-result/DbSaveSurveyResultFactory';

export const makeSaveSurveyResultContoller = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveById(),
    makeDbSaveSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
