import mongoose from "mongoose";

// db 설정및 연결
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected");
  } catch (error: any) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
