import React, {useEffect,useState} from 'react'
import {MDBCard,MDBCardBody,MDBInput,MDBIcon,MDBCardFooter,MDBValidation,MDBBtn,MDBSpinner}
 from "mdb-react-ui-kit";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { googleSignIn, login } from '../redux/feature/authSlice';
import {GoogleLogin} from "react-google-login"
// 323636793519-atcamsmo31giku5buqu6m2j86v7nf8q7.apps.googleusercontent.com
const dotEnv = process.env.NODE_ENV !== "production";
const clientId = dotEnv ? "246669271904-47veboe92nhm3360ecd1ba3kppu31spf.apps.googleusercontent.com" : "323636793519-atcamsmo31giku5buqu6m2j86v7nf8q7.apps.googleusercontent.com"
const initialState = {
  email: "",
  password: ""
}
const Login = () => {
  const [formValue,setFormValue] = useState(initialState)
  const {email,password} = formValue;
  const {loading,error} = useSelector(state => ({...state.auth}))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  },[error])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password){
      dispatch(login({formValue,navigate,toast}));
    }

  }
  const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValue({...formValue, [name]: value})
  }

  const googleSuccess = (resp) => {
    console.log(resp)
    const email = resp?.profileObj.email; // resp && resp.propfileObj && resp.profileObj.email
    const name = resp?.profileObj.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = {email,name,token,googleId};
    dispatch(googleSignIn({result,navigate,toast}))

  }
  
  const googleFailure = (error) => {
    toast.error(error)
  }
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center",marginTop: "120px"}}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className='col-md-12'>
              <MDBInput 
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
                invalid="true"
                validation="Please provide your email"
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
                validation="Please provide your password"
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br/>
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <MDBBtn 
                style={{width: "100%"}}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" />
                Google Sign in
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
      
    </div>
  )
}

export default Login