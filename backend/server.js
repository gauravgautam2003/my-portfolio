import express from "express";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
import cors from "cors";

const PORT = ENV.PORT;
const NODE_ENV = ENV.NODE_ENV;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "server is running" });
})

if (NODE_ENV === "development") {
    connectDB();
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })
}
