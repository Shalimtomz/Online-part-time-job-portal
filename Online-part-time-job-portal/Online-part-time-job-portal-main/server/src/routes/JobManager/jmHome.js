import express from "express";
import { jobManagerModel } from "../../models/jobManagers.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postedJobsModel } from "../../models/postedJobs.js";
import mongoose from "mongoose";
//use http://localhost:3002/jmhome

const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const{userId}=req.query;
        const response = await postedJobsModel.find({ isExpired: false,jmid:new mongoose.Types.ObjectId(userId) });
        res.json(response);
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Server not connceted"
        });
    }
})










export { router as jmHomeRouter };