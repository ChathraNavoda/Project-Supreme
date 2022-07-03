import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js"

import {
    createReport, 
    getReports, 
    getReport, 
    getReportsByUser, 
    deleteReport, 
    updateReport,
    getReportsBySearch,
    getReportsByTag,
    getRelatedReports,
    likeReport
} from "../controllers/report.js";

router.get("/search", getReportsBySearch);
router.get("/tag/:tag", getReportsByTag);
router.post("/relatedReports", getRelatedReports);
router.get("/",getReports);
router.get("/:id",getReport);

router.post("/",auth,createReport);
router.delete("/:id",auth, deleteReport);
router.patch("/:id",auth, updateReport);
router.get("/userReports/:id", auth, getReportsByUser);
router.patch("/like/:id", auth, likeReport);


export default router;
