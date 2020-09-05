import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect(url: string): Promise<void> {
    this.url = url;
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url);
    }

    return this.client.db().collection(name);
  },

  map<T>(data: any): T {
    const { _id, ...rest } = data;
    return Object.assign({}, rest, { id: _id });
  },

  mapCollection<T>(collection: any[]): T[] {
    return collection.map(c => MongoHelper.map(c));
  },
};
