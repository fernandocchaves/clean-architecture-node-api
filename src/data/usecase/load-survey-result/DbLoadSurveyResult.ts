import { LoadSurveyResult } from '@/domain/usecases/survey-result/LoadSurveyResult';
import { SurveyResultModel } from '../survey-result/save-survey-result/DbSaveSurveyResultProtocols';
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/LoadSurveyResultRepository';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    return null;
  }
}
