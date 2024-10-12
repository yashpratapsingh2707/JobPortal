import mongoose from "mongoose";


export const dbConnection = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017',{dbName:"MERN_STACK_JOB_SEEKING",})
    .then(()=>{
       console.log("connected to database");

    })
    .catch((error)=>{
        console.log(`some error occured while connecting to database: ${error}`);
    });

};