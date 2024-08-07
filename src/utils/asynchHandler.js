// write a higher order func which wrap the function in try catch block or using promise
// using promise

const asyncHandler=(fun)=>{
 return(res,rep,next)=>{
    Promise.resolve(
        fun(req,res,next)
    ).catch((error)=>next(error))
 }
}







// using try catch

// const asyncHandler=(fun)=>{async(req,res,next)=>{
//     try {
//             await fun(req,res,next)
//     } catch (error) {
//         res.status(res.statuscode || 500).json({
//             success:false,
//             message:error.message,
//         })
//     }
// }}