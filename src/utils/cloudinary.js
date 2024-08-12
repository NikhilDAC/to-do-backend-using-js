import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// configure cloudinary

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

// create function for uploading file
// wrap up within try catch block 
// using asynch or awit because file uploading is time consuming
const uploadFile= async(localFilePath)=>{

    try {
        if(!localFilePath) return null;
        const result= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log("File uploaded successfully.!! ", result);
        fs.unlink(localFilePath);
        
    } catch (error) {
        // log the error
        console.log("File uploading error: ", error);
        fs.unlink(localFilePath);
        return null;
        
    }
}

export default uploadFile