import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { DbLoadSurveyById } from '@/data/usecase/survey/load-survey-by-id/DbLoadSurveyById';

export const makeDbLoadSurveById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};
