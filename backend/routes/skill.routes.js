import express from "express";
import {
    getAllSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const skillRouter = express.Router();

// GET    /api/skills       — fetch all skills (grouped by category for Skills.jsx)
skillRouter.get("/", getAllSkills);

// POST   /api/skills       — add a new skill
skillRouter.post("/", protect, createSkill);

// PUT    /api/skills/:id   — update a skill
skillRouter.put("/:id", protect, updateSkill);

// DELETE /api/skills/:id   — remove a skill
skillRouter.delete("/:id", protect, deleteSkill);

export default skillRouter;
