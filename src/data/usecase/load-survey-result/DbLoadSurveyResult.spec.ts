import { SurveyResultModel } from '../survey-result/save-survey-result/DbSaveSurveyResultProtocols';
import { mockSurveyResultModel } from '@/domain/test';
import { DbLoadSurveyResult } from './DbLoadSurveyResult';
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/LoadSurveyResultRepository';

describe('DbLoadSurveyResult', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel());
      }
    }

    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
    const loadSurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load('any_survey_id');

    expect(loadSurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });
});
