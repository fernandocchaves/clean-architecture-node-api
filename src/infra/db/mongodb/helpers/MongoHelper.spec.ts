import { MongoHelper as sut } from './MongoHelper';

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let accountConlection = await sut.getCollection('accounts');
    expect(accountConlection).toBeTruthy();
    await sut.disconnect();

    accountConlection = await sut.getCollection('accounts');
    expect(accountConlection).toBeTruthy();
  });
});
