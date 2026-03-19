import express from "express";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
import cors from "cors";
import contactRouter from "./routes/contact.routes.js";
import profileRouter from "./routes/profile.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

const PORT = ENV.PORT || 5000;
const NODE_ENV = ENV.NODE_ENV || "development";

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173", // no trailing slash
    credentials: true
}));

// ✅ Routes
app.use("/api", contactRouter);
app.use("/api/user", profileRouter);

// ✅ 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ✅ Error Middleware (always last)
app.use(errorMiddleware);

// ✅ Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`🌍 Environment: ${NODE_ENV}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1); // stop app if DB fails
    }
};

startServer();