import React, {useState} from 'react'
import {MDBContainer,MDBNavbar,MDBNavbarBrand,MDBCollapse,MDBIcon,
  MDBNavbarToggler,MDBNavbarLink,MDBNavbarItem,MDBNavbarNav}
 from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/feature/authSlice';
import { searchTour } from '../redux/feature/tourSlice';
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode"
const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => ({...state.auth}))

  const token = user?.token;

  if (token) {
    // install jwt-decode to decode expired token
    const decodeToken = decode(token);
    if (decodeToken.exp * 1000 < new Date().getTime()){
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTour(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("")
    }else {
      navigate("/");
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  }
  return (
    <MDBNavbar fixed='top' expand="lg" style={{backgroundColor: "#f0e6ea"}}>
      <MDBContainer>
        <MDBNavbarBrand
        href='/' style={{ fontWeight: "600", fontSize: "22px"}}>
            Tour
        </MDBNavbarBrand>
        <MDBNavbarToggler
        type='button'
        aria-expanded="false"
        aria-label="Toogle navigation"
        onClick={() => setShow(!show)}
        style={{color: "#606060"}}
        >
          <MDBIcon icon="bars" fas/>
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 style={{marginRight: "30px",marginTop: "27px"}}>
                Logged in as : {user?.result?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <p className='header-text'>Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                <MDBNavbarLink href='/addtour'>
                  <p className='header-text'>Add Tour</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/dashboard'>
                  <p className='header-text'>Dashboard</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              </>
              )}
              {user?.result?._id ? (
                <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p className='header-text' onClick={handleLogout}>Logout</p>
                </MDBNavbarLink>
              </MDBNavbarItem> ): (
                <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p className='header-text'>Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              )}
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <input 
              type="text"
              placeholder="Search Tour"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{marinTop: "5px",marginleft: "5px"}}>
              <MDBIcon fas icon='search'/>
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header
