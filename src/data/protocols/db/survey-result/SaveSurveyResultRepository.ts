import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/SaveSurveyResult';
import { SurveyResultModel } from '@/domain/models/SurveyResult';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
