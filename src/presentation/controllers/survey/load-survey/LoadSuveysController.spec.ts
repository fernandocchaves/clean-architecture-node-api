import MockDate from 'mockdate';
import { LoadSuveysController } from './LoadSuveysController';
import { LoadSurveys } from './LoadSurveyControllerProtocols';
import {
  ok,
  serverError,
  noContent,
} from '@/presentation/helpers/http/HttpHelpers';
import { throwError, mockSurveyModels } from '@/domain/test';
import { mockLoadSurvey } from '@/presentation/test';

type SutTypes = {
  sut: LoadSuveysController;
  loadSurveysStub: LoadSurveys;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurvey();
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
    expect(httpResponse).toEqual(ok(mockSurveyModels()));
  });

  test('Should return 204 if LoadSurveys return empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
