import { LoadSurveys } from '../../../domain/usecases/LoadSurveys';
import { SurveyModel } from '../../../domain/models/Survey';
import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';

export class DbLoadSurvey implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
