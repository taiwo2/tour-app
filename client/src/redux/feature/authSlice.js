import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api"
export const login = createAsyncThunk("/auth/login", async({formValue, navigate, toast},{rejectWithValue}) => {
  try {
    const response = await api.signin(formValue);
    toast.success("Login Successfully");
    navigate("/")
    return response.data
  } catch (error) {
    console.log(error.response.data)
    return rejectWithValue(error.response.data);
  }
})

export const register = createAsyncThunk("/auth/register", async({formValue, navigate, toast},{rejectWithValue}) => {
  try {
    const response = await api.signup(formValue);
    toast.success("Register Successfully");
    navigate("/")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const googleSignIn = createAsyncThunk("/auth/googleSignIn", async({result, navigate, toast},{rejectWithValue}) => {
  try {
    const response = await api.googleSignIn(result);
    toast.success("Google Login Successfully");
    navigate("/")
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false
  },
  reducers: {
    setUser: (state,action) =>{
      state.user= action.payload
    },
    setLogout: (state,action) => {
      localStorage.clear();
      state.user= null;
    }
  },
  extraReducers: {
    [login.pending]: (state,action) =>{
      state.loading= true
    },
    [login.fulfilled]: (state,action) =>{
      state.loading= false
      localStorage.setItem("profile",JSON.stringify({...action.payload}));
      state.user= action.payload
    },
    [login.rejected]: (state,action) => {
      state.loading= false
      state.error= action.payload.message
    },
    [register.pending]: (state,action) =>{
      state.loading= true
    },
    [register.fulfilled]: (state,action) =>{
      state.loading= false
      localStorage.setItem("profile",JSON.stringify({...action.payload}));
      state.user= action.payload
    },
    [register.rejected]: (state,action) => {
      state.loading= false
      state.error= action.payload.message
    }
  },
  [googleSignIn.pending]: (state,action) =>{
    state.loading= true
  },
  [googleSignIn.fulfilled]: (state,action) =>{
    state.loading= false
    localStorage.setItem("profile",JSON.stringify({...action.payload}));
    state.user= action.payload
  },
  [googleSignIn.rejected]: (state,action) => {
    state.loading= false
    state.error= action.payload.message
  },
});


export const { setUser,setLogout } = authSlice.actions;

export default authSlice.reducer;
