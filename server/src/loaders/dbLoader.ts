import mongoose from 'mongoose';
import config from '../config';

const dbLoader = async () => {
  try {
    const { connection } = await mongoose.connect(config.mongodb.mongoUri!, {
      dbName: config.mongodb.dbName,
    });
    console.log(
      `MongoDB Connected! db:${connection.name} host:${connection.host}`.cyan
        .underline,
    );
  } catch (error) {
    console.log('in db', error);
    process.exit(1);
  }
};
export default dbLoader;
