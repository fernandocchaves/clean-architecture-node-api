import { LogErrorRespository } from '../../../../data/protocols/db/LogErrorRespository';
import { MongoHelper } from '../helpers/MongoHelper';

export class LogMongoRepository implements LogErrorRespository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
