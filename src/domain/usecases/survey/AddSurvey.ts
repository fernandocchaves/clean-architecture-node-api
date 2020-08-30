import { SurveyModel } from '@/domain/models/Survey';

export type AddSurveyParams = Omit<SurveyModel, 'id'>;

export type AddSurvey = {
  add(data: AddSurveyParams): Promise<void>;
};
