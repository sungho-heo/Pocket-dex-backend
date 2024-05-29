import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Morgan 미들웨어 설정

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/pokemon-auth")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// server start
app.listen(PORT, () => console.log(`Start Server http://localhost:{PORT}/`));
