import { LoadSurveyById } from '@/domain/usecases/LoadSurveyById';
import { SurveyModel } from '@/domain/models/Survey';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRespository: LoadSurveyByIdRepository,
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRespository.loadById(id);

    return null;
  }
}
