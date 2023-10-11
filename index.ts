import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import path from "path";

import mainRoutes from "./routes/main";
import userRoutes from "./routes/users";
import pointerRoutes from "./routes/pointers";



const app = express();
const PORT = process.env.PORT || 8001;

//connectDB();

/* LONG TERM::
        --> try clusterizing this 
        --> LB-ing using NGINX 
    */

//======[ initialize app() ]===========
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());


//=======[ define routing ]==============
app.use("/",mainRoutes);
app.use("/user", userRoutes);
app.use("/pointers", pointerRoutes);



//========[ define environment ]=============
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    //if dont recognize file - send back the OG index.html file

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}

module.exports = app.listen(PORT, () => {
    console.log(`NodeJS for Mapifinds running on port: ${PORT}`);
});