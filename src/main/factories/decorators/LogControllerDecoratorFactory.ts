import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decoratos/LogControllerDecorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';

export const makeLogControllerDecorator = (
  controller: Controller,
): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
