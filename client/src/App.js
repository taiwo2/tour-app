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

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(setUser(user));
  },[])
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addtour/:id" element={<AddTour />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
