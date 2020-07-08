import { LoadSurveys } from '@/domain/usecases/LoadSurveys';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { DbLoadSurvey } from '@/data/usecase/load-survey/DbLoadSurvey';

export const makeDbLoadSurvey = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurvey(surveyMongoRepository);
};
