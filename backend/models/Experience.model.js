import mongoose from "mongoose";

// Based on Experience.jsx frontend data structure:
// { id, type: "work"|"education", title, company, location, period, description, technologies[] }

const experienceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["work", "education"],
        default: "work",
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,    // company name OR institution name
        trim: true,
    },
    location: {
        type: String,
        default: "India",
    },
    period: {
        type: String,       // e.g. "2023 - 2027" or "2025 - 2026"
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],     // skill tags shown on cards
        default: [],
    },
    order: {
        type: Number,       // for display ordering
        default: 0,
    },
}, {
    timestamps: true,
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;