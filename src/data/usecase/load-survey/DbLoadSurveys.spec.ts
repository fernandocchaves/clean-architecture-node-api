import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '../../../domain/models/Survey';
import { DbLoadSurvey } from './DbLoadSurvey';

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'amy_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'amy_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll(): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()));
      }
    }

    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
    const sut = new DbLoadSurvey(loadSurveysRepositoryStub);
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadSpy).toHaveBeenCalled();
  });
});
