// create user route & export it

import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router=Router();
 
router.route("/register").post(
// use multer as middleware
    upload.single("avtar"),
/** 
 * upload.file({name:"avtar",maxCount:1},{name:"coverImage",maxCount:1}) is used to upload file
 * */    

    registerUser
)


export default router;