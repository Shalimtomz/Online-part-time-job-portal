import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    userName:{type:String, required:true},
    passWord:{type:String, required:true }
},
{collection:'students'})

export const studentModel = mongoose.model("students",studentSchema);