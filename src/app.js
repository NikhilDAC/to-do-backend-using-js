import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();
/**
 * Always configure the cors origin and cookies parser after app is initalized 
 * to configure cors and cookies parser we need to use app.use(). 
 * This app.use() is used to configure cors and cookies parser & writing middleware.
 */

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))

// set up the  request data may be in json,file,form-data etc

app.use(express.json({
    limit:"16kb"
}));

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}));

app.use(express.static(`public`))

app.use(cookieParser())

// import route
import userRoutes from "./routes/user.routes.js"


// define route 
        // prefix. from here controller goes to userRoutes
app.use("/api/v1/users",userRoutes)

export default app;