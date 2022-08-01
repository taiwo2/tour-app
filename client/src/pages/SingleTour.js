import React, {useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBIcon,MDBContainer, MDBCardImage, MDBCardText,MDBBtn}
 from "mdb-react-ui-kit";
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedTours, getTour } from '../redux/feature/tourSlice';
import moment from "moment"
import RelatedTour from '../components/RelatedTour';
import DisqusThread from '../components/DisqurTread';
const SingleTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {tour,relatedTour} = useSelector((state) => ({...state.tour}))
  console.log(relatedTour)
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    };
    // eslint-disable-next-line
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
          <MDBBtn 
            style={{float: "left",color: "#000",}} 
            tag="a" 
            color="none"
            onClick={() => navigate('/')}
          >
            <MDBIcon 
              fas 
              // style={{float: "left"}}
              size="lg"
              icon="long-arrow-alt-left"
            />
          </MDBBtn>
            <h3 style={{textAlign: "center"}}>{tour.title}</h3> <br />
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
