import React, {useEffect,useState} from 'react'
import {  MDBBtn, MDBCardBody, MDBCardGroup, MDBCardTitle,MDBCardImage, MDBCard, MDBCol, MDBIcon, MDBRow}
 from "mdb-react-ui-kit";
 import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getTourByUser } from '../redux/feature/tourSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
const Dashboard = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state.auth}));
  const {userTour,loading} = useSelector((state) => ({...state.tour}));

  const userId = user?.result?._id;
  console.log("taieo", userTour)
  const readShot = (str) => {
    if (typeof str === "string") {
    str = str.substring(0,40) + "..."
    }
    return str;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour")) {
      dispatch(deleteTour({id,toast}))
    }
  }
  useEffect(() => {
    if (userId) {
      dispatch(getTourByUser(userId))
    }
  },[userId]);
  if (loading) {
    return <Spinner/>
  }
  return (
    <div  style={{margin: "auto", padding: "120px", maxWidth: "900px", alignContent: "center"}}>
      <h4 className='text-center'> Dashboard:  {user?.result.name}</h4>
      <hr  style={{maxWidth: "750px"}}/>
      {userTour && userTour.map((item) =>(
        <MDBCardGroup key={item._id} >
          <MDBCard style={{maxWidth: "600px"}} className="mt-2">
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage 
                 className="rounded"
                 src={item.imageFile}
                 alt={item.title}
                 fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardTitle className="text-start">
                    <small className='text-muted'>
                      {readShot(item.description)}
                    </small>
                  </MDBCardTitle>
                  <div style={{marginLeft: "5px", marginTop: "-60px", float: "right"}}>
                    <MDBBtn className='mt-1' tag="a" color="none">
                      <MDBIcon
                        fas
                        icon='trash'
                        style={{color: "#dd4b39"}}
                        size='lg'
                        onClick={() => handleDelete(item._id)}
                      />
                    </MDBBtn>
                    <Link to={`/editTour/${item._id}`}>
                      <MDBIcon
                          fas
                          icon='edit'
                          style={{color: "#55acee", marginLeft: "10px"}}
                          size='lg'
                        />
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </div>
  )
}

export default Dashboard
