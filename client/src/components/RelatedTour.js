import React from 'react'
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText,MDBCol,MDBRow}
 from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

 
const RelatedTour = ({relatedTour, tourId}) => {

  const readShot = (str) => {
    if (typeof str === "string") {
      return str.substring(0,45) + "..."
    }
  }
  return (
    <>
    {relatedTour && relatedTour.length > 0 && (
      <>
      {relatedTour.length > 1 && <h4 style={{textAlign: 'center'}}>Related Tours</h4>}
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {relatedTour.filter((item) => item._id !== tourId)
          .splice(0,3)
          .map((item) => (
          <MDBCol>
            <MDBCard>
              <Link to={`/tour/${item._id}`}>
                <MDBCardImage 
                  src={item.imageFile}
                  alt={item.title}
                  position="top"
                />
              </Link>
              <span className="text-start text-card">
                {item.tags.map((tag) => (
                  <Link to={`/tours/tags/${tag}`} className="me-1">#{tag}</Link>
                ))}
              </span>
              <MDBCardBody>
                <MDBCardTitle className="text-start">
                  {item.title}
                </MDBCardTitle>
                <MDBCardText className="text-start">
                  {readShot(item.description)}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      
      </>
    )}
    </>
  )
}

export default RelatedTour