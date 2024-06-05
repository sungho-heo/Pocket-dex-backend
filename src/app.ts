import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import favRoutes from "./routes/fav";

const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Morgan 미들웨어 설정

// router
app.use("/api/auth", authRoutes);
app.use("/api/fav", favRoutes);

export default app;
