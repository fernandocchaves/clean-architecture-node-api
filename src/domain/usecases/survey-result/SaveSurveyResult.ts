import { SurveyResultModel } from '@/domain/models/SurveyResult';

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>;

export type SaveSurveyResult = {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
};
