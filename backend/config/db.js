import mongoose from "mongoose";
import ENV from "./env.js";

const MONGOBD_URL = ENV.MONGOBD_URL;

const connectDB = async () => {
    try {
        if(!MONGODB_URL){
            console.error("MONGODB_URL is not defined in .env file");
            process.exit(1);
        }
        const conn = await mongoose.connect(MONGOBD_URL, {
            useNewUrlParser : true,
            useUnfiedTopotogy : true,
        })

        mongoose.connection.on("connected", (conn) => {
            console.log(`MongoDB connected: ${conn.connection.host}`);
        })

    } catch (error) {
        console.log(`Error connecting to MongoDB : ${error.message}`);
        process.exit(1);
    }
}