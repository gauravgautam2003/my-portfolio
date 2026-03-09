import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    profileImage : {
        type : String,
        required : true,
    },
    professionalTitle : {
        type : String,
        default : "Full Stack Developer",
    },
    about : {
        Type : String,
        default : "I'm a passionate Full Stack Developer with expertise in building modern, scalable, and lightning-fast web applications. I specialize in the MERN stack and love turning complex ideas into seamless, high-impact digital experiences. With a strong foundation in both frontend and backend development, I create responsive user interfaces and robust server-side applications. I'm constantly learning new technologies and staying updated with the latest industry trends."
    },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;