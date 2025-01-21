
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongodServer: MongoMemoryServer;

export const dbConnect = async () => {
  mongodServer =  await MongoMemoryServer.create();
  const uri = mongodServer.getUri();
  await mongoose.connect(uri);
};

export const dbDisconnect =  async () => { 
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongodServer.stop()
}

export const clearCollections = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany();
  }
}
