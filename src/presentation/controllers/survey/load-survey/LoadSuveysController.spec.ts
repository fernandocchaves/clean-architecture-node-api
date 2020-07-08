import MockDate from 'mockdate';
import { LoadSuveysController } from './LoadSuveysController';
import { SurveyModel, LoadSurveys } from './LoadSurveyControllerProtocols';
import { ok, serverError, noContent } from '../../../helpers/http/HttpHelpers';

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

const makeLoadSurvey = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysStub();
};

type SutTypes = {
  sut: LoadSuveysController;
  loadSurveysStub: LoadSurveys;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurvey();
  const sut = new LoadSuveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSuveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeSurveys()));
  });

  test('Should return 204 if LoadSurveys return empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve([])));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
