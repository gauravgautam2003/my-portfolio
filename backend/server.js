import express from "express";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
// import cors from "cors";
import contactRouter from "./routes/contact.routes.js";

const PORT = ENV.PORT;
const NODE_ENV = ENV.NODE_ENV;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

app.use("/api/auth", contactRouter);

app.get("/contact", (req,res)=>{
   res.send("API working");
});
const start = async () => {
    try{
        await connectDB();
        if(NODE_ENV === "development"){
            app.listen(PORT , async () => {
                console.log(`http://localhost:${PORT}`);
            })
        }
    }catch(error){
        console.log("server error", + error);
    }
}

start();
