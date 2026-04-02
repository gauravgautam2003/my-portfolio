import Experience from "../models/Experience.model.js";

// ─── GET All Experiences ───────────────────────────────────────────────────
// GET /api/experiences
// Optional query: ?type=work | ?type=education
const getAllExperiences = async (req, res) => {
    try {
        const { type } = req.query;

        const filter = type ? { type } : {};

        const experiences = await Experience.find(filter).sort({ order: 1, createdAt: -1 });

        // Split into work and education for frontend convenience
        const work      = experiences.filter(e => e.type === "work");
        const education = experiences.filter(e => e.type === "education");

        res.status(200).json({
            success: true,
            count: experiences.length,
            experiences,
            work,
            education,
        });
    } catch (error) {
        console.error("getAllExperiences error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch experiences",
        });
    }
};

// ─── CREATE Experience ─────────────────────────────────────────────────────
// POST /api/experiences
const createExperience = async (req, res) => {
    const { type, title, company, location, period, description, technologies, order } = req.body;

    try {
        if (!type || !title || !company || !period || !description) {
            return res.status(400).json({
                success: false,
                message: "type, title, company, period and description are required",
            });
        }

        // Technologies can arrive as JSON string or array
        let parsedTechnologies = [];
        if (technologies) {
            try {
                parsedTechnologies = typeof technologies === "string"
                    ? JSON.parse(technologies)
                    : technologies;
            } catch {
                parsedTechnologies = technologies.split(",").map(t => t.trim());
            }
        }

        const experience = await Experience.create({
            type,
            title,
            company,
            location: location || "India",
            period,
            description,
            technologies: parsedTechnologies,
            order: order || 0,
        });

        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            experience,
        });
    } catch (error) {
        console.error("createExperience error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create experience",
        });
    }
};

// ─── UPDATE Experience ─────────────────────────────────────────────────────
// PUT /api/experiences/:id
const updateExperience = async (req, res) => {
    const { id } = req.params;
    const { type, title, company, location, period, description, technologies, order } = req.body;

    try {
        const experience = await Experience.findById(id);
        if (!experience) {
            return res.status(404).json({ success: false, message: "Experience not found" });
        }

        let parsedTechnologies;
        if (technologies) {
            try {
                parsedTechnologies = typeof technologies === "string"
                    ? JSON.parse(technologies)
                    : technologies;
            } catch {
                parsedTechnologies = technologies.split(",").map(t => t.trim());
            }
        }

        const updateData = {
            ...(type         && { type }),
            ...(title        && { title }),
            ...(company      && { company }),
            ...(location     && { location }),
            ...(period       && { period }),
            ...(description  && { description }),
            ...(parsedTechnologies && { technologies: parsedTechnologies }),
            ...(order !== undefined && { order }),
        };

        const updated = await Experience.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            experience: updated,
        });
    } catch (error) {
        console.error("updateExperience error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update experience",
        });
    }
};

// ─── DELETE Experience ─────────────────────────────────────────────────────
// DELETE /api/experiences/:id
const deleteExperience = async (req, res) => {
    const { id } = req.params;

    try {
        const experience = await Experience.findByIdAndDelete(id);
        if (!experience) {
            return res.status(404).json({ success: false, message: "Experience not found" });
        }

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
        });
    } catch (error) {
        console.error("deleteExperience error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete experience",
        });
    }
};

export { getAllExperiences, createExperience, updateExperience, deleteExperience };
