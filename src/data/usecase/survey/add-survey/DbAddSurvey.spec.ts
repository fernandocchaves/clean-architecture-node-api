import MockDate from 'mockdate';
import { DbAddSurvey } from './DbAddSurvey';
import { AddSurveyRepository } from './DbAddSurveyProtocols';
import { throwError, mockAddSuveyParams } from '@/domain/test';
import { mockAddSurveyRepository } from '@/data/test';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const suveyData = mockAddSuveyParams();
    await sut.add(suveyData);

    expect(addSpy).toHaveBeenCalledWith(suveyData);
  });

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockImplementationOnce(throwError);

    const promise = sut.add(mockAddSuveyParams());
    await expect(promise).rejects.toThrow();
  });
});
