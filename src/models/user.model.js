import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebToken from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Name is required"],
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
        index:true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],

        
    },
    avtar:{
        type:String, // image is uploaded on cloudnary
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }
    // completated task
    // completedTask:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Todo"
    //     }
    // ],
    // // pending task
    // pendingTask:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Todo"
    //     }
    // ]
},{timestamps:true});

// use mongoose middleware to hash the password
userSchema.pre("save",function async (next){

    // we don't want run this code on every save
    if(this.isModified("password")){
    this.password=bcrypt.hash(this.password,10)
    return next();
    }
    return next();
})

// mongoose also allowed to use methods in schema here we insert the modhod for password checking
userSchema.methods.verifyPassword= async function(password){
    return await bcrypt.compare(password,this.password)
}
// method to generate token
userSchema.methods.generateAccessToken=function(){
 return jsonwebToken.sign({
        _id:this._id,
        userName:this.userName,
        email:this.email
    },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
};
userSchema.methods.generateRefreshToken=function(){
    return jsonwebToken.sign({
        _id:this._id,
    },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
)
};
export const User=mongoose.model("User",userSchema);