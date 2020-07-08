import { Collection } from 'mongodb';
import { LogMongoRepository } from './LogMongoRepository';
import { MongoHelper } from '@/infra/db/mongodb//helpers/MongoHelper';

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe('LogMongoRespository', () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  test('Should create an error log on succes', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
