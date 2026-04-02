import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { uploadSingle } from "../middleware/multer.js";

const profileRouter = express.Router();

// GET  /api/user/profile  — fetch profile data (used in About.jsx, Home.jsx)
profileRouter.get("/profile", getProfile);

// POST /api/user/profile  — create or update profile with optional image upload
profileRouter.post("/profile", uploadSingle.single("profileImage"), updateProfile);

export default profileRouter;