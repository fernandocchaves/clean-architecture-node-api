import { LogErrorRespository } from '@/data/protocols/db/log/LogErrorRespository';

export const mockLogErrorRepository = (): LogErrorRespository => {
  class LogErrorRepositoryStub implements LogErrorRespository {
    async logError(stack: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new LogErrorRepositoryStub();
};
