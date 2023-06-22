import express from 'express';
import { applicationsModel } from '../../models/applications.js';
import mongoose from 'mongoose';
import { studentModel } from '../../models/students.js';
//use http://localhost:3002/getappl

const router=express.Router();

router.get("/",async function(req,res){
    const {pjid}=req.query;
    console.log(pjid);
    const applications= await applicationsModel.find({pjid:new mongoose.Types.ObjectId(pjid)}).populate({path:'sid',select:'_id fullName'});
    if(applications){
        res.json(applications);
    }
    else{
        applications=[];
        res.json(applications);
    }
}

);

export {router as getApplicationRouter};
