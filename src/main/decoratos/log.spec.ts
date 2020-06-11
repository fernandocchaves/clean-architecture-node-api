import { LogControllerDecorator } from './log';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';
import { serverError } from '../../presentation/helpers/HttpHelpers';
import { LogErrorRespository } from '../../data/protocols/LogErrorRespository';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Fernando',
        },
      };

      return new Promise(resolve => resolve(httpResponse));
    }
  }

  return new ControllerStub();
};

const makeLogErrorRepository = (): LogErrorRespository => {
  class LogErrorRepositoryStub implements LogErrorRespository {
    async log(stack: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new LogErrorRepositoryStub();
};

interface SutTypes {
  sut: LogControllerDecorator;
  logErrorRepositoryStub: LogErrorRespository;
  controllerStub: Controller;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub,
  );

  return {
    sut,
    logErrorRepositoryStub,
    controllerStub,
  };
};

describe('LogControllerDecorator', () => {
  test('Should call controller handle ', async () => {
    const { sut, controllerStub } = makeSut();
    const httpResquest = {
      body: {
        email: 'any-email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    await sut.handle(httpResquest);
    expect(handleSpy).toHaveBeenCalledWith(httpResquest);
  });

  test('Should return the same result of controller ', async () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        email: 'any-email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpResquest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Fernando',
      },
    });
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error ', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();

    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');

    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise(resolve => resolve(error)));

    const httpResquest = {
      body: {
        email: 'any-email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpResquest);
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
