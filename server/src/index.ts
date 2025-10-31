import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(router);

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

const PORT = process.env.PORT ?? 3333;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
