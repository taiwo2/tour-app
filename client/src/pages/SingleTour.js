import React, {useEffect,useState} from 'react'
import {MDBCard,MDBCardBody,MDBIcon,MDBContainer, MDBCardImage, MDBCardText}
 from "mdb-react-ui-kit";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedTours, getTour } from '../redux/feature/tourSlice';
import moment from "moment"
import RelatedTour from '../components/RelatedTour';
import DisqusThread from '../components/DisqurTread';
const SingleTour = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {tour,relatedTour} = useSelector((state) => ({...state.tour}))
  console.log(relatedTour)
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id))
    }
  },[id]);

  return (
    <>
      <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
          <MDBCardImage
            position="top"
            style={{maxWidth: "1400px"}}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName"> created By: {tour.name}</p>
            </span>
            <div style={{float: "left"}}>
              <span className='text-start'>
                {tour && tour.tags && tour.tags.map((item) => `#${item}`)}
              </span>
            </div>
            <br />
            <MDBCardText className='text-start mt-2'>
              <MDBIcon 
                style={{float: "left", margin: "5px"}}
                far
                icon="calendar-alt"
                size='lg'
              />
              <small className='muted'>
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className='lead text-start mb-0'>
              {tour?.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTour relatedTour={relatedTour} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`}/>
      </MDBContainer>
    </>
  )
}

export default SingleTour
