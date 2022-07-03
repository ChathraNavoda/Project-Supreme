import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags:[String],
    imageFile: String,
    createdAt:{
        type: Date,
        default: new Date(),
    },
    likes:{
        type: [String],
        default: [],
    },
});

const ReportModel = mongoose.model("Report", reportSchema);
export default ReportModel;