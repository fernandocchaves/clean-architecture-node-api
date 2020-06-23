import { DbAddSurvey } from './DbAddSurvey';
import { AddSurveyModel, AddSurveyRepository } from './DbAddSurveyProtocols';

const makeFakeSuveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add(surveyData: AddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const suveyData = makeFakeSuveyData();
    await sut.add(suveyData);

    expect(addSpy).toHaveBeenCalledWith(suveyData);
  });
});
