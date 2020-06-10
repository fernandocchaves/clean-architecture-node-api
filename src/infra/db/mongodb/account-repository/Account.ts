import { AddAccountRepository } from '../../../../data/protocols/AddAccountRepository';
import { AddAccountModel } from '../../../../domain/usecases/AddAccount';
import { AccountModel } from '../../../../domain/models/Account';
import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];

    const { _id, ...accountWithoutId } = account;

    return Object.assign({}, accountWithoutId, { id: _id });
  }
}
