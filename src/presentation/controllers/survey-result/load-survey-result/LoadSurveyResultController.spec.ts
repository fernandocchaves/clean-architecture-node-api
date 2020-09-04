import { LoadSurveyResultController } from './LoadSurveyResultController';
import { HttpRequest } from './LoadSurveyResultControllerProtocols';
import { mockLoadSurveyById } from '@/presentation/test';

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

describe('LoadSurveyResultController', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    const sut = new LoadSurveyResultController(loadSurveyByIdStub);
    await sut.handle(mockRequest());

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
