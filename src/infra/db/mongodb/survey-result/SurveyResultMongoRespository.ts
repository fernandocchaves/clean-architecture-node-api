import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/SaveSurveyResultRepository';
import { SaveSurveyResultModel } from '@/domain/usecases/SaveSurveyResult';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyResultMongoRespository
  implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResults',
    );
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId,
      },
      {
        $set: {
          answer: data.answer,
          date: data.date,
        },
      },
      {
        upsert: true,
        returnOriginal: false,
      },
    );

    return res.value && MongoHelper.map(res.value);
  }
}
