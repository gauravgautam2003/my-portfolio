import express from "express";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
import cors from "cors";

// ─── Route Imports ──────────────────────────────────────────────────────────
import contactRouter    from "./routes/contact.routes.js";
import profileRouter    from "./routes/profile.routes.js";
import projectRouter    from "./routes/project.routes.js";
import experienceRouter from "./routes/experience.routes.js";
import skillRouter      from "./routes/skill.routes.js";
import aiRouter         from "./routes/ai.routes.js";
import errorMiddleware  from "./middleware/error.middleware.js";

const app = express();

const PORT     = ENV.PORT     || 5000;
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
// Contact   → POST   /api/contact
//
// Profile   → GET    /api/user/profile
//             POST   /api/user/profile
//
// Projects  → GET    /api/projects          (?category=Frontend)
//             POST   /api/projects
//             PUT    /api/projects/:id
//             DELETE /api/projects/:id
//
// Experience→ GET    /api/experiences        (?type=work|education)
//             POST   /api/experiences
//             PUT    /api/experiences/:id
//             DELETE /api/experiences/:id
//
// Skills    → GET    /api/skills
//             POST   /api/skills
//             PUT    /api/skills/:id
//             DELETE /api/skills/:id
//
app.use("/api",           contactRouter);
app.use("/api/user",      profileRouter);
app.use("/api/projects",  projectRouter);
app.use("/api/experiences", experienceRouter);
app.use("/api/skills",    skillRouter);
app.use("/api/ai",        aiRouter);

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
            console.log(`🌍 Environment : ${NODE_ENV}`);
            console.log(`\n📌 API Routes:`);
            console.log(`   POST   /api/contact`);
            console.log(`   GET    /api/user/profile`);
            console.log(`   POST   /api/user/profile`);
            console.log(`   GET    /api/projects`);
            console.log(`   POST   /api/projects`);
            console.log(`   PUT    /api/projects/:id`);
            console.log(`   DELETE /api/projects/:id`);
            console.log(`   GET    /api/experiences`);
            console.log(`   POST   /api/experiences`);
            console.log(`   PUT    /api/experiences/:id`);
            console.log(`   DELETE /api/experiences/:id`);
            console.log(`   GET    /api/skills`);
            console.log(`   POST   /api/skills`);
            console.log(`   PUT    /api/skills/:id`);
            console.log(`   DELETE /api/skills/:id\n`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();