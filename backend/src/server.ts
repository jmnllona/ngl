import "dotenv/config"

import express from "express";
import path from "path";
import messageRoutes from './routes/messageRoutes.ts'
import { fileURLToPath } from "url";
import cors from "cors";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST"],        // allowed methods
  credentials: true                // if you use cookies/auth
}));

// app.use(express.static(path.join(__dirname, '../dist')));

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// });

//routes
app.use("/api", messageRoutes);


const PORT = process.env['PORT']|| 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));