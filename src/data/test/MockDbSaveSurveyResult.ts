import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/SaveSurveyResultRepository';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/SaveSurveyResult';
import { mockSurveyResultModel } from '@/domain/test';
import { SurveyResultModel } from '@/domain/models/SurveyResult';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new SaveSurveyResultRepositoryStub();
};
