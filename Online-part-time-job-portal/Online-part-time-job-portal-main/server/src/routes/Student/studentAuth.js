import express  from "express";
import { studentModel } from "../../models/students.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//use http://localhost:3002/studentauth

const router = express.Router();

router.post("/register",async function(req,res){
    console.log(req.body);
    const {fullName,userName,passWord}=req.body;
    const student= await studentModel.findOne({userName});

    if(student){
        return res.json({message:"username already exist"});
    }
    const hashPassword= await bcrypt.hash(passWord,10);
    const newStudent = new studentModel({fullName,userName,passWord:hashPassword});
    console.log(newStudent)
    await newStudent.save();
    res.json({message:"User registered successfully"});

})
 
router.post("/login",async function (req,res){
    console.log(req.body);
    const {userName,passWord}=req.body;
    const student= await studentModel.findOne({userName});
    if(!student){
        return res.json({message:"User does not exist"});
    }
    const isValid= await bcrypt.compare(passWord,student.passWord);
    if(!isValid){
        return res.json({message:"Incorrect Password"});
    }
    const token=jwt.sign({id:student._id},"secret");
    res.json({message:"You are successfully logined in",token:token,userId:student._id});
})





export {router as studentAuthRouter};