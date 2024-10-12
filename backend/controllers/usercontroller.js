import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandeler from "../middlewares/error.js"; 

import {sendToken} from '../utils/jwtToken.js'
import {User} from "../models/userSchema.js";
export const register = catchAsyncError(async(req,res,next)=>{

    const {name,email,phone,role,password} = req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandeler("Please fill full resistration form!"));

    }
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandeler)
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    });
    sendToken(user,200,res,"user Registered Sucessfully!");

});

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandeler("Please provide email,password and role.",400));

    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandeler("Invalid Email or password",400));

    }
    const isPasswordMatched = await user.comparePassword(password);
    //console.log(user.password,password);
    if(user.password != password){
        return next(new ErrorHandeler("Invalid Email or password",400));

    }

    // if(!isPasswordMatched){
    //     return next(new ErrorHandeler("Invalid Email or Ppassword",400));

    // }
 
    if(user.role != role){
        return next(new ErrorHandeler("User with this role does not found!",400));

    }
    sendToken(user,200,res,"User logged in sucessfully!");
});


 export const logout = catchAsyncError(async (req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        sucess:true,
        message: "User loggedout sucessfully!",
    });
 });

 export const getUser = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        sucess: true,
        user,
    })
 });