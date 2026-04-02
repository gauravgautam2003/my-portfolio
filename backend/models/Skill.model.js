import mongoose from "mongoose";

// Based on Skills.jsx frontend data structure:
// skillCategories[ { title, skills[ { name, color } ] } ]
// Categories: "Languages", "Frontend Development", "Backend Development", "Tools & Technologies"

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,       // hex color used for icon glow, e.g. "#61DAFB"
        default: "#ffffff",
    },
    category: {
        type: String,
        required: true,
        enum: ["Languages", "Frontend Development", "Backend Development", "Tools & Technologies"],
    },
    order: {
        type: Number,       // for custom ordering within a category
        default: 0,
    },
}, {
    timestamps: true,
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;