import mongoose from "mongoose";

// connect to mongoDB
const connectToMongoDB = async (connectionURL: string) => {
  await mongoose.connect(connectionURL);
};

export { connectToMongoDB };
