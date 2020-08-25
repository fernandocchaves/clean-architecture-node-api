import { SurveyModel } from '@/domain/models/Survey';

export interface LoadSurveyByIdRepository {
  loadById(Id: string): Promise<SurveyModel>;
}
