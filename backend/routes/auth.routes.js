import express from "express";
import { login, getMe, initAdmin } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/login", login);
authRouter.get("/init", initAdmin); // One-time admin setup

// Protected routes
authRouter.get("/me", protect, getMe);

export default authRouter;
