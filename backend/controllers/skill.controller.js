import Skill from "../models/Skill.model.js";

// ─── GET All Skills ────────────────────────────────────────────────────────
// GET /api/skills
// Returns skills grouped by category — matches Skills.jsx skillCategories structure
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1, createdAt: 1 });

        // Group by category for convenient frontend consumption
        const grouped = {};
        skills.forEach(skill => {
            if (!grouped[skill.category]) {
                grouped[skill.category] = [];
            }
            grouped[skill.category].push({
                _id: skill._id,
                name: skill.name,
                color: skill.color,
            });
        });

        // Convert to array format matching Skills.jsx skillCategories
        const categories = [
            "Frontend Development",
            "Backend Development",
            "Tools & Technologies",
        ].map(title => ({
            title,
            skills: grouped[title] || [],
        }));

        res.status(200).json({
            success: true,
            count: skills.length,
            skills,         // flat list
            categories,     // grouped — ready to render in Skills.jsx
        });
    } catch (error) {
        console.error("getAllSkills error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
        });
    }
};

// ─── CREATE Skill ──────────────────────────────────────────────────────────
// POST /api/skills
const createSkill = async (req, res) => {
    const { name, color, category, order } = req.body;

    try {
        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: "name and category are required",
            });
        }

        const skill = await Skill.create({
            name,
            color: color || "#ffffff",
            category,
            order: order || 0,
        });

        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            skill,
        });
    } catch (error) {
        console.error("createSkill error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create skill",
        });
    }
};

// ─── UPDATE Skill ──────────────────────────────────────────────────────────
// PUT /api/skills/:id
const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, color, category, order } = req.body;

    try {
        const skill = await Skill.findById(id);
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }

        const updateData = {
            ...(name     && { name }),
            ...(color    && { color }),
            ...(category && { category }),
            ...(order !== undefined && { order }),
        };

        const updated = await Skill.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            skill: updated,
        });
    } catch (error) {
        console.error("updateSkill error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update skill",
        });
    }
};

// ─── DELETE Skill ──────────────────────────────────────────────────────────
// DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }

        res.status(200).json({
            success: true,
            message: "Skill deleted successfully",
        });
    } catch (error) {
        console.error("deleteSkill error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
        });
    }
};

export { getAllSkills, createSkill, updateSkill, deleteSkill };
