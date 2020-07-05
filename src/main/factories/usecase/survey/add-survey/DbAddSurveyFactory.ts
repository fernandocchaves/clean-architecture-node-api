import { AddSurvey } from '../../../../../domain/usecases/AddSurvey';
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/SurveyMongoRepository';
import { DbAddSurvey } from '../../../../../data/usecase/add-survey/DbAddSurvey';

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbAddSurvey(surveyMongoRepository);
};
