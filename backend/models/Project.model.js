import mongoose from "mongoose";

// Based on Projects.jsx frontend data structure:
// { id, title, description, image, category, techStack[], github, liveDemo }

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,        // Cloudinary URL
        default: "",
    },
    category: {
        type: String,
        required: true,
        enum: ["All", "Frontend", "Backend", "Full Stack", "Mobile"],
        default: "Full Stack",
    },
    techStack: {
        type: [String],      // e.g. ["React", "Node.js", "MongoDB"]
        default: [],
    },
    github: {
        type: String,
        default: "",
    },
    liveDemo: {
        type: String,
        default: "",
    },
    order: {
        type: Number,        // for custom ordering on frontend
        default: 0,
    },
}, {
    timestamps: true,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;