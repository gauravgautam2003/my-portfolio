import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    frontend: {
        icon: {
            type: String,
            required: true,
            unique: true,
        },
        skills: {
            type: String,
            default: ["HTML", "CSS", "Tailwind.css", "React.js", "javascript"],
            required: true,
        }
    },
    backend: {
        icon: {
            type: String,
            required: true,
            unique: true,
        },
        skills: {
            type: String,
            default: ["Node.js", "Express.js", "Mongodb"],
            required: true,
        }
    },
    toolsAndTechnology: {
        icon: {
            type: String,
            required: true,
            unique: true,
        },
        skills: {
            type: String,
            default: ["Git","GitHub","vscode"],
            required: true,
        }
    },

});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;