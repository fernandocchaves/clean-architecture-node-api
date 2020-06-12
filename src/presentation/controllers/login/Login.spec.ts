import { LoginController } from './Login';
import { HttpRequest } from '../../protocols';
import { badRequest } from '../../helpers/HttpHelpers';
import { MissingParamError } from '../../errors';

const makeSut = (): LoginController => {
  return new LoginController();
};

describe('LoginController', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no password is provided', async () => {
    const sut = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });
});
