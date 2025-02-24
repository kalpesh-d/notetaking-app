import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import noteRouter from "./routes/noteRouter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
  });
}