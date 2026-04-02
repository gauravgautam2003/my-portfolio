import express from "express";
import {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} from "../controllers/experience.controller.js";

const experienceRouter = express.Router();

// GET    /api/experiences          — fetch all (optional ?type=work or ?type=education)
experienceRouter.get("/", getAllExperiences);

// POST   /api/experiences          — create a new experience/education entry
experienceRouter.post("/", createExperience);

// PUT    /api/experiences/:id      — update an experience entry
experienceRouter.put("/:id", updateExperience);

// DELETE /api/experiences/:id      — delete an experience entry
experienceRouter.delete("/:id", deleteExperience);

export default experienceRouter;
