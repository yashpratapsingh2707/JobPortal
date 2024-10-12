import mongoose from 'mongoose'
import validator from 'validator'

import bcrypt from "bcrypt";
//import bcrypt from "jsonwebtoken";

import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [4,"Name must contain atleast 3 character!"],
        maxLength: [40,"Name can't exceed 30 character!"],
    },
    email:{
        type: String,
        required: [true,"please provide your email!"],
        validate: [validator.isEmail,"Please provide a valid email"],

    },
    phone:{
        type:Number,
        required: [true,"Please provide your phone number."],
    },
    password:{
        type: String,
        required: [true,"please provide your password"],
        minLength: [8,"password must contain atleast 8 character!"],
        maxLength: [32,"password can't exceed 8 character!"],
        select: false
    },
    role: {
        type: String,
        required :[true,"Please provide your role"],
        enum: ["job Seeker","Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

// HASSING PASSWORD
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        next();
        
    }
    this.password = await bcrypt.hash(this.password,10);
});

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
// GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        //expiresIn: process.env.JWT_EXPIRES,

        expiresIn: process.env.JWT_EXPIRE,
    })


};


export const User = mongoose.model("User",userSchema);
