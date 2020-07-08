import { SurveyAnswerModel } from '@/domain/models/Survey';

export type AddSurveyModel = {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
};

export type AddSurvey = {
  add(data: AddSurveyModel): Promise<void>;
};
