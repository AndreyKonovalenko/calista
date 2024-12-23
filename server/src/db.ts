import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DB,
    });
    console.log(
      `MongoDB Connected! db:${connection.name} host:${connection.host}`.cyan
        .underline,
    );
    // await monitor(connection);
    // return connection
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
 export const monitor = async (connection: mongoose.Connection, pipeline = []) => {
  const collection = connection.collections['boards'];
  const changedStream = collection.watch(pipeline);
  changedStream.on('change', data => {
    console.log(data)
    return data;
  });
};
