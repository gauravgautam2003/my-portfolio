import jwt from "jsonwebtoken";
import ENV from "./env.js"

const generateToken = async ({userId}) => {
    const token = new jwt.sign({ id : userId} , ENV.SECREATE_TOKEN_KEY , {expiresIn : "3d"});
    return token;
}

export default generateToken;