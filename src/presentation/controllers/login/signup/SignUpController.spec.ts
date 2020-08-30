import { SignUpController } from './SignUpController';
import {
  MissingParamError,
  ServerError,
  EmailInUseError,
} from '@/presentation/errors';
import { HttpRequest } from '@/presentation/protocols';
import {
  AddAccount,
  Validation,
  Authentication,
} from './SignUpControllerProtocols';
import {
  ok,
  serverError,
  badRequest,
  forbidden,
} from '@/presentation/helpers/http/HttpHelpers';
import { throwError, mockAccountModel } from '@/domain/test';
import {
  mockValidation,
  mockAuthentication,
  mockAddAccount,
} from '@/presentation/test';

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

type SutTypes = {
  sut: SignUpController;
  validationStub: Validation;
  addAccountStub: AddAccount;
  authenticationStub: Authentication;
};

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub,
  );

  return {
    sut,
    validationStub,
    addAccountStub,
    authenticationStub,
  };
};

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');

    await sut.handle(mockRequest());
    expect(addSpy).toBeCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error());
    });

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      ok({ account: mockAccountModel(), accessToken: 'any_token' }),
    );
  });

  test('Should return 403 AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut();
    jest
      .spyOn(addAccountStub, 'add')
      .mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
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

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, 'auth');

    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 500 if Authentication Throws', async () => {
    const { sut, authenticationStub } = makeSut();

    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
