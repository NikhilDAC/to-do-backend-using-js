import { json } from "express";
import { asyncHandler } from "../utils/asynchHandler.js"
import ApiError from "../utils/ApiErrorResponse.js";
import { User } from "../models/user.model.js";
import { upload } from "../middleware/multer.middleware.js";
import uploadFile from "../utils/cloudinary.js";
import { ApiSuccessResponse } from "../utils/ApiSuccessResponse.js";

// write a function to register user

const registerUser= asyncHandler( async(req,res)=>{
  // get user data from frontend
  const{fullName,email,password}=req.body
  console.table({fullName,email,password})
  
  // check validation rule => not empty
//   if(fullName===""){
//     throw new ApiError(400,"Name is required")
//   }
  // advance way 
  if([fullName,email,password].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"All fields are required")

  }
  if(email.includes("@")===false){
    throw new ApiError(400,"Invalid email")
}

  // check if user already exist
 const isUserExist=User.findOne({email})
 if(isUserExist){
    throw new ApiError(409,"User already exist")
 }


  //check validation for avtar is uploaded or not=> use multer as middleware in routes
  const avtarLocalPath=req.files?.avtar[0]?.path
  console.log(avtarLocalPath);
  if(!avtarLocalPath){
    throw new ApiError(400,"Please upload your avtar")
  }
  
  // upload it on cloudinary
  const avtar=await uploadFile(avtarLocalPath)
  if(!avtar){
    throw new ApiError(400,"Avtar file is required")
  }
  // create object of user-> create entry in db
  const user= await User.create({
    fullName,
    email,
    password,
    avtar:avtar.url
  })
  // check for user creation response send response back to frontend with user data. remove password & refresh token from response
  const createduser= await User.findById(user._id).select("-password -refreshToken")
 
  if(!createduser){
    throw new ApiError(500,"User not created..Server is stopped")
  }

  // send response back to frontend
 
 return res.status(201).json(
  new ApiSuccessResponse(201,createduser,"User Created Successfully")
 )
});
// this method will run when ever an URI is hit so we create a routes for it.
// goto routes=> create userRoutes.routes=> inside that file we create user route method .In this
// method we pass route name & which method we need to activate.


export{registerUser}