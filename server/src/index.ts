import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://case-welhome-1.onrender.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(router);

const PORT = process.env.PORT ?? 3333;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
