import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api"

export const createTour = createAsyncThunk("/tour/createTour", async({updatedTour, navigate, toast},{rejectWithValue}) => {
  try {
    const response = await api.createTour(updatedTour);
    toast.success("Tour Added Successfully");
    navigate("/")
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
export const getTours = createAsyncThunk("/tour/getTours", async(page,{rejectWithValue}) => {
  try {
    const response = await api.getTours(page);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
export const getTour = createAsyncThunk("/tour/getTour", async(id,{rejectWithValue}) => {
  try {
    const response = await api.getTour(id);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
export const getTourByUser = createAsyncThunk("/tour/getTourByUser", async(userId,{rejectWithValue}) => {
  try {
    const response = await api.getTourByUser(userId);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

export const deleteTour = createAsyncThunk("/tour/deleteTour", async({id,toast},{rejectWithValue}) => {
  try {
    const response = await api.deleteTour(id);
    toast.success("Delete Successfully");
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

export const updateTour = createAsyncThunk("/tour/updateTour", async({updatedTour,id,toast,navigate},{rejectWithValue}) => {
  try {
    const response = await api.updateTour(updatedTour,id);
    toast.success("Updated Successfully");
    navigate('/')
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

export const searchTour = createAsyncThunk("/tour/searchTour", async(searchQuery,{rejectWithValue}) => {
  try {
    const response = await api.getTourBySearch(searchQuery);
    return response.data
  } catch (error) {
    // console.log(error)
    return rejectWithValue(error.response.data);
  }
});
export const getTagTour = createAsyncThunk("/tour/getTagTour", async(tag,{rejectWithValue}) => {
  try {
    const response = await api.getTourByTagTour(tag);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
export const getRelatedTours = createAsyncThunk("/tour/getRelatedTours", async(tags,{rejectWithValue}) => {
  try {
    const response = await api.getRelatedTours(tags);
    console.log('relate',response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
export const likeTours = createAsyncThunk("/tour/likeTour", async({_id},{rejectWithValue}) => {
  try {
    const response = await api.likeTour(_id);
    // console.log('wiw',response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTour: [],
    tagTours: [],
    currentPage: 1,
    numberOfPages: null,
    relatedTour: [],
    error: "",
    loading: false
  },

  reducers: {
    setCurrentPage: (state,action) =>{
      state.currentPage= action.payload
    }
  },
  extraReducers: {
    [createTour.pending]: (state,action) =>{
      state.loading= true;
    },
    [createTour.fulfilled]: (state,action) =>{
      state.loading= false;
      state.tours= [action.payload];
    },
    [createTour.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [getTours.pending]: (state,action) =>{
      state.loading= true;
    },
    [getTours.fulfilled]: (state,action) =>{
      state.loading= false;
      state.tours= action.payload.data;
      state.numberOfPages= action.payload.numberOfPages;
      state.currentPage= action.payload.currentPage;
    },
    [getTours.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [getTour.pending]: (state,action) =>{
      state.loading= true;
    },
    [getTour.fulfilled]: (state,action) =>{
      state.loading= false;
      state.tour= action.payload;
    },
    [getTour.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [getTourByUser.pending]: (state,action) =>{
      state.loading= true;
    },
    [getTourByUser.fulfilled]: (state,action) =>{
      state.loading= false;
      state.userTour= action.payload;
    },
    [getTourByUser.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [deleteTour.pending]: (state,action) =>{
      state.loading= true;
    },
    [deleteTour.fulfilled]: (state,action) =>{
      state.loading= false;
      console.log('action',action);
      const {arg: {id}} = action.meta;
      if (id){
        state.userTour = state.userTour.filter((item) => item._id !==id);
        state.tours = state.tours.filter((item) => item._id !==id);
      }
    },
    [deleteTour.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message
    },
    [updateTour.pending]: (state,action) =>{
      state.loading= true;
    },
    [updateTour.fulfilled]: (state,action) =>{
      state.loading= false;
      console.log('action',action);
      const {arg: {id}} = action.meta;
      if (id){
        state.userTour = state.userTour.map((item) => item._id === id ? action.payload : item);
        state.tours = state.tours.map((item) => item._id === id ? action.payload : item);
      }
    },
    [updateTour.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message
    },
    [searchTour.pending]: (state,action) =>{
      state.loading= true;
    },
    [searchTour.fulfilled]: (state,action) =>{
      state.loading= false;
      state.tours= action.payload;
    },
    [searchTour.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [getTagTour.pending]: (state,action) =>{
      state.loading= true;
    },
    [getTagTour.fulfilled]: (state,action) =>{
      state.loading= false;
      state.tagTours= action.payload;
    },
    [getTagTour.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [getRelatedTours.pending]: (state,action) =>{
      state.loading= true;
    },
    [getRelatedTours.fulfilled]: (state,action) =>{
      state.loading= false;
      state.relatedTour= action.payload;
    },
    [getRelatedTours.rejected]: (state,action) => {
      state.loading= false;
      state.error= action.payload.message;
    },
    [likeTours.pending]: (state,action) =>{},
    [likeTours.fulfilled]: (state,action) =>{
      state.loading= false;
      const {arg: {_id}} = action.meta;
      if (_id){
        state.tours = state.tours.map((item) => item._id === _id ? action.payload : item);
      };
    },
    [likeTours.rejected]: (state,action) => {
      state.error= action.payload.message;
    },
  },
})

export const {setCurrentPage} = tourSlice.actions;
export default tourSlice.reducer;