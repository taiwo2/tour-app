import React,{useEffect} from 'react'
import {MDBRow,MDBTypography,MDBCol,MDBContainer}
 from "mdb-react-ui-kit";
 import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch, } from 'react-redux';
import { getTours,setCurrentPage } from '../redux/feature/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from './Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, tours,currentPage,numberOfPages} = useSelector((state) => ({...state.tour}))
  useEffect(() => {
    dispatch(getTours(currentPage))
  }, [currentPage]);

  if (loading) {
    return <Spinner />
  }
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center"}}>
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className='text-center mb-0' tags="h2">
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours && tours.map((item,index) => (
                <div key={index}>
                <CardTour  {...item} />
                </div>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      <Pagination 
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        dispatch={dispatch}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Home