import React, {useEffect,useState} from 'react'
import {MDBCard,MDBCardBody,MDBInput,MDBIcon,MDBCardFooter,MDBValidation,MDBBtn,MDBSpinner} from "mdb-react-ui-kit";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register} from '../redux/feature/authSlice';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}
const Register = () => {
  const [formValue,setFormValue] = useState(initialState)
  const {email,password,firstName,lastName,confirmPassword} = formValue;
  const {loading,error} = useSelector(state => ({...state.auth}))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  },[error])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("password must match")
    if (email && password && firstName && lastName && confirmPassword){
      dispatch(register({formValue,navigate,toast}));
    }

  }
  const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValue({...formValue, [name]: value})
  }
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center",marginTop: "120px"}}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className='col-md-6'>
              <MDBInput 
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                required
                invalid="true"
                validation="Please provide First Name"
              />
            </div>
            <div className='col-md-6'>
              <MDBInput 
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleChange}
                required
                invalid="true"
                validation="Please provide last Name"
              />
            </div>
            <div className='col-md-12'>
              <MDBInput 
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
                invalid="true"
                validation="Please provide email"
              />
            </div>
            <div className='col-md-12'>
              <MDBInput 
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
                invalid="true"
                validation="Please provide password"
              />
            </div>
            <div className='col-md-12'>
              <MDBInput 
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                required
                invalid="true"
                validation="Please provide confirmpassword"
              />
            </div>
            <div className='col-12'>
              <MDBBtn style={{width: "100%"}} className="mt-2">
                {loading && (
                  <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                  />)
                }
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign in</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
      
    </div>
  )
}

export default Register
