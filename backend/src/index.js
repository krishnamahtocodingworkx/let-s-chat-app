import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connect } from "./lib/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    // origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
// app.get("/", (req, res) => {
//   return res.send("Hello world");
// });
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connect();
});
