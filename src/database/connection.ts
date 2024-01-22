import * as mongoose from "mongoose";

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://luiz:apiTest@db:27017";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log("== Connected to MongoDB == ");
  } catch (error) {
    console.log("xx MongoDB disconnected xx", error);
  }
};
