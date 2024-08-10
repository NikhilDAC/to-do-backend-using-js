import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true
    },
    // description:{
    //     type:String,
    //     required:[true,"Description is required"],
    //     trim:true
    // },
    completed:{
        type:Boolean,
        default:false
    },
    tags:[{
        type:String,
        trim:true
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"}


},{timestamps:true});

// Index for faster querying/sorting by tags
todoSchema.index({ tags: 1 });

// this plug in help us to write aggregate query
mongoose.plugin(mongooseAggregatePaginate);




export const Todo=mongoose.model("Todo",todoSchema);