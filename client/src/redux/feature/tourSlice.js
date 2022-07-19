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
export const getTours = createAsyncThunk("/tour/getTours", async(_,{rejectWithValue}) => {
  try {
    const response = await api.getTours();
    return response.data
  } catch (error) {
    console.log(error)
    // return rejectWithValue(error.response.data);
  }
});
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTour: [],
    error: "",
    loading: false
  },
  extraReducers: {
    [createTour.pending]: (state,action) =>{
      state.loading= true
    },
    [createTour.fulfilled]: (state,action) =>{
      state.loading= false
      state.tours= [action.payload]
    },
    [createTour.rejected]: (state,action) => {
      state.loading= false
      state.error= action.payload.message
    },
    [getTours.pending]: (state,action) =>{
      state.loading= true
    },
    [getTours.fulfilled]: (state,action) =>{
      state.loading= false
      state.tours= action.payload
    },
    [getTours.rejected]: (state,action) => {
      state.loading= false
      state.error= action.payload.message
    },
  },
})

export default tourSlice.reducer;