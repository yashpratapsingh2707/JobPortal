import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true,"Please provide job title"],
        minLength: [4,"Job title must contain at least 3 characters!"],
        maxLength: [50,"job title cannot exceed 50 character!"],

    },
    
    description: {
        type: String,
        required: [true,"Please provide job description"],
        minLength: [50,"job description must conain atleast 50 character"],
        maxLength: [350,"job description must contain atmost 350 character"],
    },

    category:{
        type: String,
        required: [true, "Job catagery is required!"]
    },

    country:{
        type: String,
        required: [true, "Job country is required!"]
    },

    city:{
        type: String,
        required: [true, "Job city is required!"],
    },

    location: {
        type: String,
        required: [true, "Please provide exact location!"],
    },

    fixedSalary:{
        type : Number,
        minLength :[4,"Fixed salary must contain atleast 4 digits!"],
        maxLength: [9,"Fixed salary cannot exceed 9 digits!"]
    },

    salaryFrom:{
        type : Number,
        minLength :[4,"Salary from must contain atleast 4 digits!"],
        maxLength: [9,"Salary from cannot exceed 9 digits!"]
    },

    salaryTo:{
        type : Number,
        minLength :[4,"Salary to  must contain atleast 4 digits!"],
        maxLength: [9,"Salary to  cannot exceed 9 digits!"]
    },

    expired: {
        type:Boolean,
        default:false,
    },

    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    
});

export const job = mongoose.model("job",jobSchema);
