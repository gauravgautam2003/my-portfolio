import express from "express";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
import cors from "cors";
import dns from "dns";

// ─── DNS Configuration ───────────────────────────────────────────────────────
// This fixes the "dns lookup timeout" error on some networks
dns.setServers(["8.8.4.4", "8.8.8.8"]);
// ─── Route Imports ──────────────────────────────────────────────────────────
import contactRouter from "./routes/contact.routes.js";
import profileRouter from "./routes/profile.routes.js";
import projectRouter from "./routes/project.routes.js";
import experienceRouter from "./routes/experience.routes.js";
import skillRouter from "./routes/skill.routes.js";
import aiRouter from "./routes/ai.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

const PORT = ENV.PORT || 5000;
const NODE_ENV = ENV.NODE_ENV || "development";

// ─── Core Middlewares ───────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [
        "http://localhost:5173",   // Vite dev server
        "http://localhost:3000",   // alternate dev port
    ],
    credentials: true,
}));

// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Portfolio API is running",
        environment: NODE_ENV,
    });
});

// ─── API Routes ─────────────────────────────────────────────────────────────
//
app.use("/api", contactRouter);
app.use("/api/user", profileRouter);
app.use("/api/projects", projectRouter);
app.use("/api/experiences", experienceRouter);
app.use("/api/skills", skillRouter);
app.use("/api/ai", aiRouter);

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// ─── Global Error Middleware (always last) ───────────────────────────────────
app.use(errorMiddleware);

// ─── Start Server ────────────────────────────────────────────────────────────
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`\n🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();