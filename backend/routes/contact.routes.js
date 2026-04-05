import express from "express";
import Contact from "../controllers/contact.controller.js";
import { validateContact } from "../middleware/auth.middleware.js";

const contactRouter = express.Router();

contactRouter.post("/contact",validateContact, Contact);

export default contactRouter;
