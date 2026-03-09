import dotenv from "dotenv";
dotenv.config({quiet : true});

const ENV_URI = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGODB_URL : process.env.MONGODB_URL,
}

export default ENV_URI;