import mongoose from "mongoose";

export const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error in DB connection ${error}`);
  }
};
