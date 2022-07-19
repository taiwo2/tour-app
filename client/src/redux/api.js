import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000/"});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }
  return req;
});
export const signin = (formData) => API.post("/users/signin", formData)
export const signup = (formData) => API.post("/users/signup", formData)
export const googleSignIn = (result) => API.post("/users/googleSignIn", result)
export const createTour = (tourData) => API.post("/tours/createTour", tourData)
export const getTours= () => API.get("/tours",)