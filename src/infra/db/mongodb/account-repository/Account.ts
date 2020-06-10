import { AddAccountRepository } from '../../../../data/protocols/AddAccountRepository';
import { AddAccountModel } from '../../../../domain/usecases/AddAccount';
import { AccountModel } from '../../../../domain/models/Account';
import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return MongoHelper.map<AccountModel>(result.ops[0]);
  }
}