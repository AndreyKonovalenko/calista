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
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
