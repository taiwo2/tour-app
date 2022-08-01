import axios from 'axios';

const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ?  REACT_APP_DEV_API  : REACT_APP_PROD_API }`,
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }
  return req;
});
export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post("/tours/createTour", tourData);
export const getTours= (page) => API.get(`/tours?page=${page}`);
export const getTour= (id) => API.get(`/tours/${id}`);
export const getTourBySearch= (searchQuery) => API.get(`/tours/search?searchQuery=${searchQuery}`);
export const getTourByTagTour= (tag) => API.get(`/tours/tag/${tag}`);
export const getRelatedTours= (tags) => API.post("/tours/relatedTour",tags);
export const deleteTour= (id) => API.delete(`/tours/${id}`);
export const updateTour= (updatedTour,id) => API.patch(`/tours/${id}`,updatedTour);
export const getTourByUser= (userId) => API.get(`/tours/userTour/${userId}`) ;///user Id not tour Id
export const likeTour= (id) => API.patch(`/tours/like/${id}`) ;///user Id not tour Id