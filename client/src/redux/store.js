import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice"
import tourReducer from "./feature/tourSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer
  }
})