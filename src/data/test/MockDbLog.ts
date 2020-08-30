import { LogErrorRespository } from '@/data/protocols/db/log/LogErrorRespository';

export const mockLogErrorRepository = (): LogErrorRespository => {
  class LogErrorRepositoryStub implements LogErrorRespository {
    async logError(stack: string): Promise<void> {
      return Promise.resolve();
    }
  }

  return new LogErrorRepositoryStub();
};
