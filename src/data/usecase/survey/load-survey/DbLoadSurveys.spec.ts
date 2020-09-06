import { DbLoadSurvey } from './DbLoadSurvey';
import { LoadSurveysRepositorySpy } from '@/data/test';
import { throwError } from '@/domain/test';
import MockDate from 'mockdate';
import faker from 'faker';

type SutTypes = {
  sut: DbLoadSurvey;
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy();
  const sut = new DbLoadSurvey(loadSurveysRepositorySpy);
  return {
    sut,
    loadSurveysRepositorySpy,
  };
};

describe('DbLoadSurvey', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    const accountId = faker.random.uuid();

    const { sut, loadSurveysRepositorySpy } = makeSut();
    await sut.load(accountId);
    expect(loadSurveysRepositorySpy.accountId).toBe(accountId);
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut();
    const surveys = await sut.load(faker.random.uuid());
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels);
  });

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut();
    jest
      .spyOn(loadSurveysRepositorySpy, 'loadAll')
      .mockImplementationOnce(throwError);
    const promise = sut.load(faker.random.uuid());
    await expect(promise).rejects.toThrow();
  });
});
