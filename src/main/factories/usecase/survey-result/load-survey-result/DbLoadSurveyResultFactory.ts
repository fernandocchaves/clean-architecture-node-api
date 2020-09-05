import { LoadSurveyResult } from '@/domain/usecases/survey-result/LoadSurveyResult';
import { DbLoadSurveyResult } from '@/data/usecase/survey-result/load-survey-result/DbLoadSurveyResult';
import { SurveyResultMongoRespository } from '@/infra/db/mongodb/survey-result/SurveyResultMongoRespository';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRespository();
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository,
  );
};
