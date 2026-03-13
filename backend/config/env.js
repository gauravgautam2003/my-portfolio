import dotenv from "dotenv";
dotenv.config({quiet : true});

const ENV_URI = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGODB_URL : process.env.MONGODB_URL,
    MY_EMAIL : process.env.MY_EMAIL,
    MY_PASSWORD : process.env.MY_PASSWORD,
    SECRET_TOKEN_KEY : process.env.SECRET_TOKEN_KEY
}

export default ENV_URI;