import React, { useEffect } from 'react'
import {MDBCardText,MDBCardGroup,MDBCard,MDBCardImage, MDBCardTitle, MDBRow, MDBCol, MDBBtn}
 from "mdb-react-ui-kit";
 import Spinner from '../components/Spinner';
 import { useDispatch, useSelector } from 'react-redux';
 import { getTagTour, searchTour } from '../redux/feature/tourSlice';
 import { useNavigate, useParams } from 'react-router-dom';


const TagTours = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {tagTours, loading} = useSelector(state => ({...state.tour}));
  const {tag} = useParams();

  const readShot = (str) => {
    if (typeof str === "string") {
      str = str.substring(0,40) + "..."
      }
      return str;
  }
  useEffect(() => {
    if (tag) {
      dispatch(getTagTour(tag));
    }
  }, [tag]);

  if (loading) {
    return <Spinner />
  }
  return (
    <div style={{margin: "auto", padding: "120px", maxWidth: "900px", alignContent: "center"}}>
      <h3 className="text-center"> Tours with Tags: {tag}</h3>
      <hr className={{maxWidth: "750px"}} />
      {tagTours && tagTours.map((item) => (
        <MDBCardGroup key={item._id}>
          <MDBCard style={{maxWidth: "600px"}} className="mt-2">
            <MDBRow className='g-0'>
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded"
                  src={item.imageFile}
                  alt={item.title}
                  fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardTitle className="text-start">
                  {item.title}
                </MDBCardTitle>
                <MDBCardTitle className="text-start">
                  {readShot(item.description)}
                </MDBCardTitle>
                <div style={{float: "left",marginTop: "-10px"}}>
                  <MDBBtn 
                  size="sm"
                  color="info"
                  onClick={() => navigate(`/tour/${item._id}`)}
                  >
                    Read More
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </div>
  )
}

export default TagTours
