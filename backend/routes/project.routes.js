import express from "express";
import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/project.controller.js";
import { uploadSingle } from "../middleware/multer.js";

const projectRouter = express.Router();

// GET    /api/projects           — fetch all projects (optional ?category=Frontend)
projectRouter.get("/", getAllProjects);

// POST   /api/projects           — create a new project (with optional image)
projectRouter.post("/", uploadSingle.single("image"), createProject);

// PUT    /api/projects/:id       — update a project (with optional new image)
projectRouter.put("/:id", uploadSingle.single("image"), updateProject);

// DELETE /api/projects/:id       — delete a project
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
