import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "📚 Library API is running! Use /api/books or /api/borrow",
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", error: null });
});

app.use(errorHandler);

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/library";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Mongo connected");
    app.listen(PORT, () => console.log(`Listening ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });
