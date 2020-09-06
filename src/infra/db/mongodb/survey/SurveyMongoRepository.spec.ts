import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper';
import { SurveyMongoRepository } from './SurveyMongoRepository';
import { Collection } from 'mongodb';
import { AccountModel } from '@/domain/models/Account';
import { mockAddAccountParams, mockAddSurveyParams } from '@/domain/test';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return MongoHelper.map(res.ops[0]);
};

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut();
      const addSurvey = mockAddSurveyParams();
      await sut.add(addSurvey);

      const survey = await surveyCollection.findOne({
        question: addSurvey.question,
      });
      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const account = await mockAccount();
      const addSurveyModel = [mockAddSurveyParams(), mockAddSurveyParams()];
      const result = await surveyCollection.insertMany(addSurveyModel);
      const survey = result.ops[0];
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const sut = makeSut();
      const surveys = await sut.loadAll(account.id);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe(addSurveyModel[0].question);
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].question).toBe(addSurveyModel[1].question);
      expect(surveys[1].didAnswer).toBe(false);
    });

    test('Should load empty list', async () => {
      const account = await mockAccount();
      const sut = makeSut();
      const surveys = await sut.loadAll(account.id);
      expect(surveys.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
        ],
        date: new Date(),
      });

      const sut = makeSut();
      const survey = await sut.loadById(res.ops[0]._id);
      expect(survey).toBeTruthy();
      expect(survey.id).toBeTruthy();
    });
  });
});
