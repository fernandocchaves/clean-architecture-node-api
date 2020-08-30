import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { mockSurveyModels, mockSurveyModel } from '@/domain/test';
import { SurveyModel } from '@/domain/models/Survey';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyStub();
};

export const mockLoadSurvey = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveyModels()));
    }
  }
  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()));
    }
  }

  return new LoadSurveyByIdStub();
};
