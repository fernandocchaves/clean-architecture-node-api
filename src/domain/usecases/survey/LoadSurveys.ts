import { SurveyModel } from '@/domain/models/Survey';

export interface LoadSurveys {
  load(accountId: string): Promise<SurveyModel[]>;
}
