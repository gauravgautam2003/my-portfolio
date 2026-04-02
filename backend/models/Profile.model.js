import mongoose from "mongoose";

// Based on About.jsx and Home.jsx:
// personalInfo: name, location, email, availability
// education: degree, field, year, institution
// social links
// profileImage, professionalTitle, about text

const profileSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        default: "",        // Cloudinary URL — optional, not required
    },
    name: {
        type: String,
        default: "Gaurav Gautam",
    },
    professionalTitle: {
        type: String,
        default: "Full Stack Developer",
    },
    location: {
        type: String,
        default: "India",
    },
    email: {
        type: String,
        default: "gauravgautam9865@gmail.com",
    },
    phone: {
        type: String,
        default: "+91 9557799584",
    },
    availability: {
        type: String,
        default: "Open to Work",
    },
    about: {
        type: String,
        default: "I'm a passionate Full Stack Developer with expertise in building modern, scalable, and lightning-fast web applications. I specialize in the MERN stack and love turning complex ideas into seamless, high-impact digital experiences.",
    },
    // Social links
    github: {
        type: String,
        default: "https://github.com/gauravgautam2003",
    },
    linkedin: {
        type: String,
        default: "https://www.linkedin.com/in/gaurav-gautam-a850362a4/",
    },
    whatsapp: {
        type: String,
        default: "https://whatsapp.com/channel/0029VbBj5b5GehEPNFo3nT2d",
    },
    // Education (from About.jsx)
    education: [
        {
            degree: { type: String, default: "Bachelor of Technology" },
            field:  { type: String, default: "Computer Science & Engineering" },
            year:   { type: String, default: "2023 - 2027" },
            institution: { type: String, default: "Institute of Technology" },
        }
    ],
}, {
    timestamps: true,
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;