import { LoginController } from './LoginController';
import { HttpRequest, Authentication } from './LoginControllerProtocols';
import { Validation } from '@/presentation/controllers/login/signup/SignUpControllerProtocols';
import { MissingParamError } from '@/presentation/errors';
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '@/presentation/helpers/http/HttpHelpers';
import { throwError } from '@/domain/test';
import { mockAuthentication, mockValidation } from '@/presentation/test';

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
  },
});

type SutTypes = {
  sut: LoginController;
  validationStub: Validation;
  authenticationStub: Authentication;
};

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();

  const sut = new LoginController(authenticationStub, validationStub);
  return {
    sut,
    authenticationStub,
    validationStub,
  };
};

describe('LoginController', () => {
  test('Should return 500 if Authentication Throws', async () => {
    const { sut, authenticationStub } = makeSut();

    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();

    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, 'auth');

    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }));
  });

  test('Should call Validator with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');

    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toBeCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field')),
    );
  });
});
