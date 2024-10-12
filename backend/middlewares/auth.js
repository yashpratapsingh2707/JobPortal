import {catchAsyncError} from './catchAsyncError.js'
import ErrorHandeler from './error.js'

import {User} from '../models/userSchema.js'
import jwt from 'jsonwebtoken'
export const isAuthorised = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandeler("User not authorised",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
});