// // while connecting database we has two option
// /** writing all code inside the index file or writing all code inside the db folder and just import
//  * that function in index.js & execute that function
//  * 
//  * Keep in mind that connection of database might cause error so use try catch block or resolve ,reject
//  * & database is another continent so it takes time to connect so always use async await
//  * 
//  * after connecting db we start the server
//  */

// import express from "express";
// import mongoose from "mongoose";
// import MONGODB_URL from "../.env"
// import DB_NAME from "./constant.js";

// // write iffe function
// ;(async ()=>{
// try {
//     const dbConnection= await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
//     console.log("Mongodb connected: ", dbConnection.connection.host, dbConnection.connection.name);
    
// } catch (error) {
//     console.log("Mongodb connection error: ", error);
//     process.exit(1);
    
// }
// })()

// 2 approach
import dotenv from "dotenv";
import dbConnect from "./db/connection.js";
import {app} from "./app.js";

// configure environment variables first

dotenv.config({
    path: "./.env"
});

// dbConnect is an asynch function so after complete the it's exicution it return the promise
dbConnect()
    .then(()=>{
        // start the server
        app.listen(process.env.PORT || 3000, ()=>{
            console.log(` Server is running on port: ${process.env.PORT}`);
        })
    })
    .catch((error)=>{`DB Connection Error: ${error}`});