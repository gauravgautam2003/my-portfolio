import Project from "../models/Project.model.js";
import cloudinary from "../config/cloudinary.js";

// ─── Helper: Upload buffer to Cloudinary ───────────────────────────────────
const uploadBufferToCloudinary = (buffer, folder = "portfolio/projects") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Callback Error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Listen for stream-level errors (like ECONNRESET)
        stream.on("error", (error) => {
            console.error("Cloudinary Stream Error:", error);
            reject(error);
        });

        stream.end(buffer);
    });
};

// ─── GET All Projects ──────────────────────────────────────────────────────
// GET /api/projects
// Optional query: ?category=Frontend
const getAllProjects = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = category && category !== "All"
            ? { category }
            : {};

        const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            projects,
        });
    } catch (error) {
        console.error("getAllProjects error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
};

// ─── CREATE Project ────────────────────────────────────────────────────────
// POST /api/projects
const createProject = async (req, res) => {
    const { title, description, category, techStack, github, liveDemo, order } = req.body;

    try {
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "title, description and category are required",
            });
        }

        let imageUrl = "";
        if (req.file) {
            const result = await uploadBufferToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        // techStack can arrive as JSON string or comma-separated
        let parsedTechStack = [];
        if (techStack) {
            try {
                parsedTechStack = typeof techStack === "string"
                    ? JSON.parse(techStack)
                    : techStack;
            } catch {
                parsedTechStack = techStack.split(",").map(t => t.trim());
            }
        }

        const project = await Project.create({
            title,
            description,
            image: imageUrl,
            category,
            techStack: parsedTechStack,
            github: github || "",
            liveDemo: liveDemo || "",
            order: order || 0,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.error("createProject error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create project",
        });
    }
};

// ─── UPDATE Project ────────────────────────────────────────────────────────
// PUT /api/projects/:id
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, techStack, github, liveDemo, order } = req.body;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        let imageUrl;
        if (req.file) {
            const result = await uploadBufferToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        let parsedTechStack;
        if (techStack) {
            try {
                parsedTechStack = typeof techStack === "string"
                    ? JSON.parse(techStack)
                    : techStack;
            } catch {
                parsedTechStack = techStack.split(",").map(t => t.trim());
            }
        }

        const updateData = {
            ...(title             && { title }),
            ...(description       && { description }),
            ...(category          && { category }),
            ...(parsedTechStack   && { techStack: parsedTechStack }),
            ...(github !== undefined && { github }),
            ...(liveDemo !== undefined && { liveDemo }),
            ...(order !== undefined && { order }),
            ...(imageUrl          && { image: imageUrl }),
        };

        const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updated,
        });
    } catch (error) {
        console.error("updateProject error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update project",
        });
    }
};

// ─── DELETE Project ────────────────────────────────────────────────────────
// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Optionally delete image from Cloudinary
        if (project.image) {
            const publicId = project.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`portfolio/projects/${publicId}`);
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("deleteProject error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
        });
    }
};

export { getAllProjects, createProject, updateProject, deleteProject };
