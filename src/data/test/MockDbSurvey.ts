import { AddSurveyRepository } from '@/data/protocols/db/survey/AddSurveyRepository';
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { SurveyModel } from '@/domain/models/Survey';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';
import { LoadSurveysRepository } from '../protocols/db/survey/LoadSurveysRepository';

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams;

  async add(data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id;
    return Promise.resolve(this.surveyModel);
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveyModels = mockSurveyModels();
  callsCount = 0;

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve(this.surveyModels);
  }
}
