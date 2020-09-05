import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/survey-result/SaveSurveyResult';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyResultModel } from '@/domain/test';
import { LoadSurveyResult } from '@/domain/usecases/survey-result/LoadSurveyResult';

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data;
    return Promise.resolve(this.surveyResultModel);
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;

  async load(surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    return Promise.resolve(this.surveyResultModel);
  }
}
