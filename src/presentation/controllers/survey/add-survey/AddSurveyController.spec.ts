import MockDate from 'mockdate';
import {
  HttpRequest,
  AddSurvey,
  Validation,
} from './AddSurveyControllerProtocols';
import { AddSurveyController } from './AddSurveyController';
import {
  badRequest,
  serverError,
  noContent,
} from '@/presentation/helpers/http/HttpHelpers';
import { throwError } from '@/domain/test';
import { mockValidation, mockAddSurvey } from '@/presentation/test';

const mockRequest = (): HttpRequest => ({
  body: {
    question: 'amy_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  },
});

type SutTypes = {
  sut: AddSurveyController;
  validationStub: Validation;
  addSurveyStub: AddSurvey;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidation();
  const addSurveyStub = mockAddSurvey();
  const sut = new AddSurveyController(validationStub, addSurveyStub);

  return {
    sut,
    validationStub,
    addSurveyStub,
  };
};

describe('AddSurveyController', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequest = mockRequest();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call AddSurveyUseCase with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const httpRequest = mockRequest();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut();
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
