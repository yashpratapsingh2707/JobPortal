import express from "express";
import {login,register,logout,getUser} from '../controllers/usercontroller.js';

import {isAuthorised} from "../middlewares/auth.js";
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthorised,logout);
router.get("/getUser",isAuthorised,getUser);
export default router; 