import React,{useEffect} from 'react'
import {MDBRow,MDBTypography,MDBCol,MDBContainer} from "mdb-react-ui-kit";
import { useSelector,useDispatch, } from 'react-redux';
import { getTours,setCurrentPage } from '../redux/feature/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
const Home = () => {
  const dispatch = useDispatch();
  const {loading, tours,currentPage,numberOfPages} = useSelector((state) => ({...state.tour}))

  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation()
  useEffect(() => {
    dispatch(getTours(currentPage));
    // eslint-disable-next-line
  }, [currentPage]);

  if (loading) {
    return <Spinner />
  }
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center"}}>
      <MDBRow className="mt-5">
        {tours.length === 0 && location.pathname === "/" && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Tours Found
          </MDBTypography>
        )}
        {tours.length === 0 && location.pathname !== "/" && (
          <MDBTypography className='text-center mb-0' tag="h2">
            We couldn't any find match for "{searchQuery}"
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours && tours.map((item) => (
                <CardTour  {...item} key={item._id}/>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && !searchQuery && (
        <Pagination 
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        dispatch={dispatch}
        currentPage={currentPage}
      />
      )}
    </div>
  )
}

export default Home