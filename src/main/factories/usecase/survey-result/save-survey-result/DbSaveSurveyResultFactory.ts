import { SaveSurveyResult } from '@/domain/usecases/survey-result/SaveSurveyResult';
import { DbSaveSurveyResult } from '@/data/usecase/survey-result/save-survey-result/DbSaveSurveyResult';
import { SurveyResultMongoRespository } from '@/infra/db/mongodb/survey-result/SurveyResultMongoRespository';

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRespository();
  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository,
  );
};
