import {
  LoadSurveys,
  SurveyModel,
  LoadSurveysRepository,
} from './DbLoadSurveyProtocols';

export class DbLoadSurvey implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
