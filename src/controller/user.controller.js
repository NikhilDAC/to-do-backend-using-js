import { json } from "express";
import { asyncHandler } from "../utils/asynchHandler.js"

// write a function to register user

const registerUser= asyncHandler( async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })

    
});
// this method will run when ever an URI is hit so we create a routes for it.
// goto routes=> create userRoutes.routes=> inside that file we create user route method .In this
// method we pass route name & which method we need to activate.


export{registerUser}