import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { job } from "../models/jobSchema.js";

import ErrorHandeler from "../middlewares/error.js";



export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    
    const jobs = await job.find({expired:false});
    res.status(200).json({
        success : true,
        jobs,
    });
});

export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "job Seeker"){
        
        return next(new ErrorHandeler("Job Seeker is not alloweb to acess this resources!",400));

    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;
    if(!title || !description || !category || !country || !city || !location){
        
        return next(new ErrorHandeler("Please Provide full job details",400));

    }
   
    if((!salaryFrom || !salaryTo) && ! fixedSalary){
        return next(new ErrorHandeler("please either provide fixed salary or ranged salary!"));

    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandeler("Cannot Enter fixed and ranged salary together!"));
        
    }

    
    
    const postedBy = req.user._id;
    const Newjob = await job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })
    
    res.status(200).json({
        sucess:true,
        message: "Job created Sucessfully!",
        Newjob
    })

   

});

export const getmyJobs = catchAsyncError(async(req,res,next)=>{
    const role = req.user.role;

    if(role === "job Seeker"){
        return next(new ErrorHandeler("job Seeker is not allowed to access this resource!"));
    }

    const myjobs = await job.find({postedBy : req.user._id});
    res.status(200).json({
        success : true,
        myjobs
    });
});

export const updateJob = catchAsyncError(async(req,res,next)=>{
    const role = req.user.role;

    if(role === "job Seeker"){
        return next(new ErrorHandeler("job Seeker is not allowed to access this resource!"));
    }
    const {id} = req.params;
    let Job = await job.findById(id);

    if(!Job){
        return next(new ErrorHandeler("Opps Job not found!,404"));

    }
    Job = await job.findByIdAndUpdate(id,req.body,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    });
    res.status(200).json({
        sucess : true,
        Job,
        message: "Job Update Sucessfully!",
    });
});

export const deleteJob = catchAsyncError(async(req,res,next)=>{
    const role = req.user.role;

    if(role === "job Seeker"){
        return next(new ErrorHandeler("job Seeker is not allowed to access this resource!"));
    }
    const {id} = req.params;
    let Job = await job.findById(id);

    if(!Job){
        return next(new ErrorHandeler("Opps Job not found!,404"));

    }
    await job.deleteOne();

    res.status(200).json({
        sucess : true,
        message: "job Deleted Sucessfully!",
    });
});



export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const jobs = await job.findById(id);
      if (!jobs) {
        return next(new ErrorHandeler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      return next(new ErrorHandeler(`Invalid ID / CastError`, 404));
    }
});



// export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params;
//     try {
//       const job = await Job.findById(id);
//       if (!job) {
//         return next(new ErrorHandler("Job not found.", 404));
//       }
//       res.status(200).json({
//         success: true,
//         job,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(`Invalid ID / CastError`, 404));
//     }
//   });
  