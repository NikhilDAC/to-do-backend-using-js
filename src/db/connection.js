import mongoose from "mongoose"
import {DB_NAME} from "../constant.js";


// write asynch arrow function to connect the database


const dbConnect= async ()=>{
try {
    const dbInstance= await mongoose.connect(`${process.env.MONGODB_CONNECTION}/${DB_NAME}`);
    console.log("MongoDB connected: ", dbInstance.connection.host, dbInstance.connection.name);
} catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
    
}
}

export default dbConnect;