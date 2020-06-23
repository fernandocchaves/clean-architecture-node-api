import { HttpRequest } from './AddSurveyControllerProtocols';
import { AddSurveyController } from './AddSurveyController';
import { Validation } from '../../../protocols';
import { badRequest } from '../../../helpers/http/HttpHelpers';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'amy_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: AddSurveyController;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();

  const sut = new AddSurveyController(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe('AddSurveyController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequest = makeFakeRequest();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new Error()));
  });
});
