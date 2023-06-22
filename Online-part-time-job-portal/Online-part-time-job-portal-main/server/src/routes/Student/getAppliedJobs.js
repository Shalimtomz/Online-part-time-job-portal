import express  from "express";
import { studentModel } from "../../models/students.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postedJobsModel } from "../../models/postedJobs.js";
import { applicationsModel } from "../../models/applications.js";
//use http://localhost:3002/getapldjbs

const router = express.Router();

router.get("/",async function(req,res){
    const {sid}=req.query;
    try{
        const appliedJobsId = await  applicationsModel.find({sid}).distinct('pjid');
        const response= await postedJobsModel.find({
            _id: { $in: appliedJobsId },isExpired:false
          });
        res.json(response);
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Server not connceted"
        });
    }
})



 






export {router as getAppliedJobsRouter};