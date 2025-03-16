import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connect } from "./lib/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connect();
});
