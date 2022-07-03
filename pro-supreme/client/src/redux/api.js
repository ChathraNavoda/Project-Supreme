import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";
const {REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;
 
const API = axios.create({
  baseURL: `${devEnv? REACT_APP_DEV_API : REACT_APP_PROD_API }`,
});

 API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
     }
     return req;
 });

 export const signIn = (formData)=> API.post("/users/signin", formData);
 export const signUp = (formData)=> API.post("/users/signup", formData);
 export const googleSignIn = (result)=> API.post("/users/googleSignIn", result);

 export const createReport = (reportData)=> API.post("/report", reportData);
 export const getReports = (page)=> API.get(`/report?page=${page}`);
 export const getReport = (id)=> API.get(`/report/${id}`);
 export const deleteReport = (id)=> API.delete(`/report/${id}`);
 export const updateReport = (updatedReportData,id)=> API.patch(`/report/${id}`, updatedReportData);
 export const getReportsByUser = (userId)=> API.get(`/report/userReports/${userId}`);

 export const getReportBySearch = (searchQuery)=> API.get(`/report/search?searchQuery=${searchQuery}`);

 export const getTagReports = (tag)=> API.get(`/report/tag/${tag}`);
 export const getRelatedReports = (tags)=> API.post(`/report/relatedReports`,tags);

 export const likeReport = (id) => API.patch(`/report/like/${id}`);

