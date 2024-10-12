import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide your name!"],
        minLength: [2,"Name must contain atleast 2 characher!"],
        minLength: [4,"Name must contain atleast 2 characher!"],

    },
    email: {
        type: String,
        validator: [validator.isEmail,"Please provide a valid Email"],

        required: [true,"Please provide a valid email!"],
    },
    coverLetter: {
        type: String,
        required :[true,"please provide your cover Letter!"],
    },
    phone: {
        type : Number,
        required: [true,"Please provide your phone number!"]
    },
    address: {
        type: String,
        required: [true,"Please provide your phone number"]
    },
    resume: {
        public_id:{
            type:String, 
            required:true
        },
        url:{
            type:String,
            required:true
        },
        applicantID:{
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",

                required: true
            },
            role: {
                type:String,
                enum: ["job Seeker"],

                required:true
            }
        },
        employerID:{
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                
                required: true
            },
            role: {
                type:String,
                enum: ["Employer"],

                required:true
            }
        }
    }
});

export const Application = mongoose.model("application",applicationSchema);