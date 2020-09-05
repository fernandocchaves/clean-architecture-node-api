import { LogErrorRespository } from '@/data/protocols/db/log/LogErrorRespository';

export class LogErrorRepositorySpy implements LogErrorRespository {
  stack: string;

  async logError(stack: string): Promise<void> {
    this.stack = stack;
    return Promise.resolve();
  }
}
