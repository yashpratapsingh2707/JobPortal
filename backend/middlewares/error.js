class ErrorHandeler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;

    }

}

export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal server error",
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const message = `Resource not found.Invalid ${err.path}`;
        err = new ErrorHandeler(message,400);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandeler(message,400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is Invalid Try Again`;
        err = new ErrorHandeler(message,400);
    }
    if(err.name === "TokenExpairedError"){
        const message = `Json web Token is expaired. Try Again`;
        err = new ErrorHandeler(message,400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });



};

export default ErrorHandeler;