
// handling the api error response
export class ApiError extends Error{

    constructor(
        statusCode,
        message="something went wrong",
        success=false,
        error=[]
    ){
   super(message);
   this.statusCode=statusCode;
   this.success=success
   this.data=null;
   this.message=message
   this.error=error
}
}