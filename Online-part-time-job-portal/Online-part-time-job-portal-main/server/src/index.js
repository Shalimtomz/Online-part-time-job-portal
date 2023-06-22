import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { log } from 'console';
import {studentAuthRouter} from './routes/Student/studentAuth.js'
import { studentHomeRouter } from './routes/Student/studentHome.js';
import {jmAuthRouter} from './routes/JobManager/jmAuth.js'
import { jmHomeRouter } from './routes/JobManager/jmHome.js';
import { jobApplicationRouter } from './routes/Student/jobApplication.js';
import { approveRouter } from './routes/JobManager/approve.js';
import { newJob } from './routes/JobManager/NewJob.js';
import { getApplicationRouter } from './routes/JobManager/getApplications.js';
import { getNotificationRouter } from './routes/Student/getNotifications.js';
import { getAppliedJobsRouter } from './routes/Student/getAppliedJobs.js';

const app = express();
app.use(express.json()); //put everything coming to json format
app.use(cors());        //Solve issue when making requests

app.use("/studentauth",studentAuthRouter);// everything posted and getted to /student will be handles by studentRouter
app.use("/studenthome",studentHomeRouter);

app.use("/jmauth",jmAuthRouter);
app.use("/jmhome",jmHomeRouter);

app.use("/applyjob",jobApplicationRouter);
app.use("/approve",approveRouter);

app.use("/newjob",newJob);
app.use("/getappl",getApplicationRouter)

app.use("/getnoti",getNotificationRouter)

app.use("/getapldjbs",getAppliedJobsRouter)

mongoose.connect("mongodb+srv://vyshnav:vyshnav123@ojp.1fc2g10.mongodb.net/ojpdb?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


app.listen(3002, function () {
    console.log("Server has started");
});

