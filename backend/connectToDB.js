import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`connected to mongo`);
  } catch (err) {
    console.log(`errror connecting to DB:`, err.message);
  }
};

export default connectToDB;
