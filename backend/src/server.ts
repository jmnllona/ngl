import "dotenv/config"

import express from "express";
import path from "path";
import messageRoutes from './routes/messageRoutes.js'
import { fileURLToPath } from "url";
import cors from "cors";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

import pool from "./db.js";

pool.query("SELECT NOW()")
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// Allow requests from your frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ngl-1-e7mp.onrender.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.static(path.join(__dirname, '../dist')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

//routes
app.use("/api", messageRoutes);


const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));