import React from 'react'
import {MDBCardText,MDBCardGroup,MDBCard,MDBCardImage, MDBCardBody, MDBCardTitle}
 from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
const CardTour = ({imageFile,_id,description,title,tags,name}) => {

  const readShot = (str) => {
      // return str.split("").splice(0, word).join(" ") + "..."
    if (typeof str === 'string'){
      // str = str.substring(0, 15) + '...';
    str =str.substring(0, 45) + "..."
    }
    return str
    
  }
//   function truncate(str) {
//     return typeof str === 'string' ? str.substring(0, 3) : '';
// }
// console.log(readShot(description))
  return (
    <MDBCardGroup>
      <MDBCard className='h-100 mt-2 d-sm-flex' style={{maxWidth: "20rem"}}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{maxWidth: "100%",height: "180px"}}
        />
        <div className="top-left"> {name}</div>
        <span className='text-start tag-card'>
          {tags.map((item) => `${item}`)}
        </span>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
          <MDBCardText className='text-start'>
            {readShot(description)}
            <Link to={`/tour${_id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour
