import {
  LoadSurveyById,
  SurveyModel,
  LoadSurveyByIdRepository,
} from './DbLoadSurveyByIdProtocols';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRespository: LoadSurveyByIdRepository,
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRespository.loadById(id);
    return survey;
  }
}
