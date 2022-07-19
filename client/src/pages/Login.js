import React, {useEffect,useState} from 'react'
import {MDBCard,MDBCardBody,MDBInput,MDBIcon,MDBCardFooter,MDBValidation,MDBBtn,MDBSpinner}
 from "mdb-react-ui-kit";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { googleSignIn, login } from '../redux/feature/authSlice';
import {GoogleLogin} from "react-google-login"

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
            clientId="246669271904-47veboe92nhm3360ecd1ba3kppu31spf.apps.googleusercontent.com"
            // 246669271904-47veboe92nhm3360ecd1ba3kppu31spf.apps.googleusercontent.com
            // secretclient="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"
            // 542976285825-rf19864bquhcbcrlngkfqpu7jb16soai.apps.googleusercontent.com
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