import express from "express";
import { applicationsModel } from "../../models/applications.js";
//use http://localhost:3002/approve.js
import { notify } from "./notify.js";

const router = express.Router();

router.post("/", async function (req, res) {
    console.log(req.body);
    const { aid, status } = req.body;
    try {
        const application = await applicationsModel.findById(aid);
        if (!application) {
            return res.json({ message: "There is no such application" });
        }
        else {
            application.status = status;
            await application.save();
            notify(aid, status);
            return res.json({ message: "status saved  successfully" });

        }
    } catch (err) {
        console.log(err);
    }



})






export { router as approveRouter };