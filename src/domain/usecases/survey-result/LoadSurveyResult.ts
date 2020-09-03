import { SurveyResultModel } from '@/domain/models/SurveyResult';

export type SaveSurveyResultParams = {
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
};

export type LoadSurveyResult = {
  load(usrveyId: string): Promise<SurveyResultModel>;
};
