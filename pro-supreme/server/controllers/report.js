import ReportModel from "../models/report.js";
import mongoose from "mongoose";

export const createReport = async(req,res)=>{
    const report= req.body;
    const newReport = new ReportModel({
        ...report,
        creator: req.userId,
        createdAt: new Date().toISOString()
    });
    try{
        await newReport.save();
        res.status(201).json(newReport);
    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getReports = async(req,res)=>{
    const {page} = req.query;
    try{
       // const reports = await ReportModel.find();
       // res.status(200).json(reports)
       const limit = 6
       const startIndex = (Number(page)-1 ) * limit;
       const total = await ReportModel.countDocuments({});
       const reports = await ReportModel.find().limit(limit).skip(startIndex);
       res.json({
           data: reports,
           currentPage: Number(page),
           totalReports: total,
           numberOfPages: Math.ceil(total/ limit)
       })

    }catch(error){

        res.status(404).json({message: "Something went wrong"});
    }
};

export const getReport = async(req,res)=>{
    const {id} = req.params
    try{
        const report = await ReportModel.findById(id);
        res.status(200).json(report)
    }catch(error){

        res.status(404).json({message: "Something went wrong"});
    }
};

export const getReportsByUser = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "User does not exist"})
    }
    const userReports = await ReportModel.find({creator: id});
    res.status(200).json(userReports);
};

export const deleteReport = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour exist with id: ${id}` });
      }
      await ReportModel.findByIdAndRemove(id);
      res.json({ message: "Tour deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  };

export const updateReport = async(req,res)=>{
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;

    try{
     if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `No report found with the id: ${id}`});
        }

        const updatedReport={
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id
        }
        await ReportModel.findByIdAndUpdate(id, updatedReport, {new:true});
        res.json(updatedReport);
    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
    
};

export const getReportsBySearch = async(req,res)=>{
    const {searchQuery}=req.query;
    try{
        const title= new RegExp(searchQuery,"i");
        const reports = await ReportModel.find({title});
        res.json(reports);
    }catch(error){
        res.status(404).json({message:"Something went wrong"});
    }
};

//5.19
export const getReportsByTag = async(req,res)=>{
    const {tag}=req.params;
    try{
       const reports = await ReportModel.find({tags:{$in: tag}});
       res.json(reports);
    }catch(error){
        res.status(404).json({message:"Something went wrong"});
    }
};

export const getRelatedReports = async(req,res)=>{
    const tags =req.body;
    try{
       const reports = await ReportModel.find({tags:{$in: tags}});
       res.json(reports);
    }catch(error){
        res.status(404).json({message:"Something went wrong"});
    }
};

export const likeReport = async (req, res) => {
    const { id } = req.params;
    try {
      if (!req.userId) {
        return res.json({ message: "User is not authenticated" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No Report exist with id: ${id}` });
      }
  
      const report = await ReportModel.findById(id);
  
      const index = report.likes.findIndex((id) => id === String(req.userId));
  
      if (index === -1) {
        report.likes.push(req.userId);
      } else {
        report.likes = report.likes.filter((id) => id !== String(req.userId));
      }
  
      const updatedReport = await ReportModel.findByIdAndUpdate(id, report, {
        new: true,
      });
  
      res.status(200).json(updatedReport);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    
};