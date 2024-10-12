import express from 'express';
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser"

import fileUpload from "express-fileupload";


import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";

import userRouter from "./routes/userRouter.js";
import {dbConnection} from "./database/dbconnection.js"
import {errorMiddleware} from "./middlewares/error.js"

const app = express();
dotenv.config({path: "./config/config.env"});
console.log("Port: ", process.env.PORT);
console.log("urls: ", process.env.FRONTEND_URL);
app.use(cors({
    // origin: [process.env.FRONTEND_URL],
    origin: 'http://localhost:5173',
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true,

}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp",
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/job",jobRouter);

dbConnection();

app.use(errorMiddleware);


export default app;