import express from "express";
import {
    getAllSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from "../controllers/skill.controller.js";

const skillRouter = express.Router();

// GET    /api/skills       — fetch all skills (grouped by category for Skills.jsx)
skillRouter.get("/", getAllSkills);

// POST   /api/skills       — add a new skill
skillRouter.post("/", createSkill);

// PUT    /api/skills/:id   — update a skill
skillRouter.put("/:id", updateSkill);

// DELETE /api/skills/:id   — remove a skill
skillRouter.delete("/:id", deleteSkill);

export default skillRouter;
