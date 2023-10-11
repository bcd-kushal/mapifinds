import mongoose, { connect } from "mongoose";
import "dotenv/config";
import key from "./keys"

//const mongoConn = process.env.ATLAS_URI

const DB_connect = async () => {
    try{
        await mongoose.connect(key.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected...");
    }
    catch(e:any){
        console.log(e.message);
        process.exit(1);
    }
};

module.exports = DB_connect;
