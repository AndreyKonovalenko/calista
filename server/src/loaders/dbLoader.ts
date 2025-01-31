import mongoose from 'mongoose';

 const dbLoader = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DB,
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