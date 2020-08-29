import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { DbLoadSurvey } from '@/data/usecase/survey/load-survey/DbLoadSurvey';

export const makeDbLoadSurvey = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurvey(surveyMongoRepository);
};
