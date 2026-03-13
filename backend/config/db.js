import mongoose from "mongoose";
import ENV from "./env.js";


const connectDB = async () => {
    try {
        if(!ENV.MONGODB_URL){
            console.error("MONGODB_URL is not defined in .env file");
            process.exit(1);
        }
        const conn = await mongoose.connect(ENV.MONGODB_URL)
        console.log("connection succesfully");

    } catch (error) {
        console.log(`Error connecting to MongoDB : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;