import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
