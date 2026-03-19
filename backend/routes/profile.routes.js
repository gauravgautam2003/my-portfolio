import express from "express";
import profileChanges from "../controllers/profile.controller.js";
import { uploadSingle } from "../middleware/multer.js";


const profileRouter = express.Router();

profileRouter.post("/profile", uploadSingle.single("profileImage"), profileChanges);

export default profileRouter;