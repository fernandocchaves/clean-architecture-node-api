import { SurveyResultModel } from '@/domain/models/SurveyResult';

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>;

export type SaveSurveyResult = {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
};
