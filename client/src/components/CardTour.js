import React from 'react'
import {MDBCardText,MDBCardGroup,MDBCard,MDBCardImage, MDBCardBody, MDBCardTitle, MDBBtn, MDBIcon, MDBTooltip}
 from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeTours } from '../redux/feature/tourSlice';
const CardTour = ({imageFile,_id,description,title,tags,name,likes}) => {
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch()
  const userId = user?.result?._id || user?.result?.googleId
  const readShot = (str) => {
    if (typeof str === 'string'){
    str =str.substring(0, 45) + "..."
    }
    return str 
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
        <MDBIcon fas icon="thumbs-up" />
        &nbsp;
        {likes.length > 2 ? (
          <MDBTooltip tag="a" title={`You and ${likes.length - 1} other people likes`}>
            {likes.length} Likes
          </MDBTooltip>
          ): (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )
        }
        </>
      ) : (
        <>
        <MDBIcon fas icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "likes"}
        </>
      );
    };
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleLikes = () => {
    dispatch(likeTours({_id}))
  }
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
          {tags.map((tag,index) => (
            <Link key={index} to={`/tours/tag/${tag}`} className="me-1">#{tag}</Link>
          ))}
          <MDBBtn 
            style={{float: "right"}} 
            tag="a" 
            color="none"
            onClick={!user?.result ? null : handleLikes}
          >
            {!user?.result ? (
              <MDBTooltip title={`Please Login to like Tour`} tag="a">
                <Likes />
              </MDBTooltip>
            ): (
              <Likes />
            )}    
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
          <MDBCardText className='text-start'>
            {readShot(description)}
            <Link to={`/tour/${_id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour
