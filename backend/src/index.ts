import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
import mongoose from "mongoose";
import quizRoutes from "./routes/quizRoutes";
import authRoutes from "./routes/authRoutes";
import passport from "./config/passport";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const uri = process.env.MONGO_URI!;
    console.log("Connecting to database...");

    await mongoose.connect(uri);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
