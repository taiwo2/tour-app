import {ToastContainer} from "react-toastify"
import {Routes,Route, BrowserRouter} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/feature/authSlice";
import AddTour from "./pages/AddTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrtivateRoute from "./components/PrtivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  },[])
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tours/search" element={<Home/>} />
            <Route path="/tours/tag/:tag" element={<TagTours/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addtour" 
              element={
                <PrtivateRoute>
                  <AddTour />
                </PrtivateRoute>
              } 
            />
            <Route path="/editTour/:id" 
              element={
                <PrtivateRoute>
                  <AddTour />
                </PrtivateRoute>
              } 
            />
            <Route path="/tour/:id" element={<SingleTour />} />
            <Route path="/dashboard" 
              element={
                <PrtivateRoute>
                  <Dashboard />
                </PrtivateRoute>    
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
