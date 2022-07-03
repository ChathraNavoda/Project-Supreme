import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const createReport = createAsyncThunk(
    "report/createReport",
    async({updatedReportData, navigate, toast},{rejectWithValue})=>{
    try{
        const response = await api.createReport(updatedReportData);
        toast.success("Report added Successfully");
        navigate("/");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getReports = createAsyncThunk(
    "report/getReports",
    async(page,{rejectWithValue})=>{
    try{
        const response = await api.getReports(page);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getReport = createAsyncThunk(
    "report/getReport",
    async(id,{rejectWithValue})=>{
    try{
        const response = await api.getReport(id);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const likeReport = createAsyncThunk(
    "report/likeReport",
    async ({ _id }, { rejectWithValue }) => {
      try {
        const response = await api.likeReport(_id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


export const getReportsByUser = createAsyncThunk(
    "report/getReportsByUser",
    async(userId,{rejectWithValue})=>{
    try{
        const response = await api.getReportsByUser(userId);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});


export const deleteReport= createAsyncThunk(
    "report/deleteReport",
    async({id,toast},{rejectWithValue})=>{
    try{
        const response = await api.deleteReport(id);
        toast.success("Report deleted successfully");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const updateReport= createAsyncThunk(
    "report/updateReport",
    async({id, updatedReportData, toast, navigate},{rejectWithValue})=>{
    try{
        const response = await api.updateReport(updatedReportData, id);
        toast.success("Report updated successfully");
        navigate("/");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const searchReports= createAsyncThunk(
    "report/searchReports",
    async(searchQuery,{rejectWithValue})=>{
    try{
        const response = await api.getReportBySearch(searchQuery);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getReportsByTag = createAsyncThunk(
    "report/getReportsByTag",
    async(tag,{rejectWithValue})=>{
    try{
        const response = await api.getTagReports(tag);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getRelatedReports = createAsyncThunk(
    "report/getRelatedReports",
    async(tags,{rejectWithValue})=>{
    try{
        const response = await api.getRelatedReports(tags);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

const reportSlice = createSlice({
    name: "report",
    initialState: {
        report:{},
        reports:[],
        userReports:[],
        tagReports: [],
        relatedReports: [],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false,
    },
    reducers:{
        setCurrentPage: (state, action) =>{
            state.currentPage = action.payload;
        }
    },
 
    extraReducers:{
        [createReport.pending]: (state,action)=>{
            state.loading = true;
        },
        [createReport.fulfilled]:(state,action)=>{
            state.loading = false;
           state.reports= [action.payload];
        },
        [createReport.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getReports.pending]: (state,action)=>{
            state.loading = true;
        },
        [getReports.fulfilled]:(state,action)=>{
            state.loading = false;
            state.reports= action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;

        },
        [getReports.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getReport.pending]: (state,action)=>{
            state.loading = true;
        },
        [getReport.fulfilled]:(state,action)=>{
            state.loading = false;
           state.report= action.payload;
        },
        [getReport.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getReportsByUser.pending]: (state,action)=>{
            state.loading = true;
        },
        [getReportsByUser.fulfilled]:(state,action)=>{
            state.loading = false;
           state.userReports= action.payload;
        },
        [getReportsByUser.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [deleteReport.pending]: (state,action)=>{
            state.loading = true;
        },
        [deleteReport.fulfilled]:(state,action)=>{
            state.loading = false;
            console.log("action", action);
           const {arg: {id}} = action.meta;
           if(id){
               state.userReports = state.userReports.filter((item)=> item._id !== id);
               state.reports = state.reports.filter((item)=> item._id !== id);
           }
        },
        [deleteReport.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [updateReport.pending]: (state,action)=>{
            state.loading = true;
        },
        [updateReport.fulfilled]:(state,action)=>{
            state.loading = false;
           
           const {arg: {id}} = action.meta;
           if(id){
               state.userReports = state.userReports.map((item)=> 
               item._id === id? action.payload: item);
               state.reports = state.reports.map((item)=> 
               item._id === id? action.payload: item);
           }
        },
        [updateReport.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },

        [likeReport.pending]: (state, action) => {},
        [likeReport.fulfilled]: (state, action) => {
          state.loading = false;
          const {
            arg: { _id },
          } = action.meta;
          if (_id) {
            state.reports = state.reports.map((item) =>
              item._id === _id ? action.payload : item
            );
          }
        },
        [likeReport.rejected]: (state, action) => {
          state.error = action.payload.message;
        },


        [searchReports.pending]: (state,action)=>{
            state.loading = true;
        },
        [searchReports.fulfilled]:(state,action)=>{
            state.loading = false;
           state.reports= action.payload;
        },
        [searchReports.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getReportsByTag.pending]: (state,action)=>{
            state.loading = true;
        },
        [getReportsByTag.fulfilled]:(state,action)=>{
            state.loading = false;
           state.tagReports= action.payload;
        },
        [getReportsByTag.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },
        [getRelatedReports.pending]: (state,action)=>{
            state.loading = true;
        },
        [getRelatedReports.fulfilled]:(state,action)=>{
            state.loading = false;
           state.relatedReports= action.payload;
        },
        [getRelatedReports.rejected]:(state, action)=>{
          state.loading = false;
          state.error = action.payload.message;
        },

    },
});

export const  {setCurrentPage} = reportSlice.actions;

export default reportSlice.reducer;