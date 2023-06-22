import mongoose from "mongoose";

const jobManagerSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    userName:{type:String, required:true , unique:true},
    passWord:{type:String, required:true }
},
{collection:"jobManagers"}
)

export const jobManagerModel = mongoose.model("jobManagers",jobManagerSchema);