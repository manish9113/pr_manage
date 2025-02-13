import express from "express";
import api from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGODB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.SERVER_PORT || 9000;
const allowedOrigins = [process.env.CORS_ORIGIN || "http://localhost:3000"];

const app = express();

// ✅ Correct CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
