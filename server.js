import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// CORS setup
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.PROD_FRONTEND_URL] // actual site
  : [process.env.DEV_FRONTEND_URL]; // local/dev

app.use(cors({
  origin: allowedOrigins,
  // credentials: true, 
  // if you use cookies or auth headers
}));


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
import taskRoutes from "./routes/taskRoutes.js";
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));