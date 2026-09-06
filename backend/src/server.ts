import "dotenv/config";

import express from "express";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

import pool from "./db.js";

pool.query("SELECT NOW()")
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Database connection failed:", err));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ngl-1-e7mp.onrender.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// Routes MUST come before any catch-all route
app.use("/api", messageRoutes);

const PORT = process.env["PORT"] || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});