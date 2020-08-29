import { AddSurvey } from '@/domain/usecases/survey/AddSurvey';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { DbAddSurvey } from '@/data/usecase/survey/add-survey/DbAddSurvey';

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbAddSurvey(surveyMongoRepository);
};
