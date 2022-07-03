import React, {useEffect} from 'react';
import {MDBCol,MDBContainer,MDBRow,MDBTypography} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import { getReports, setCurrentPage } from '../redux/features/reportSlice';
import CardReport from '../components/CardReport';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const {reports,loading, currentPage, numberOfPages} = useSelector((state)=>({...state.report}))
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(()=>{
    dispatch(getReports(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage])

  if(loading){
    return <Spinner/>;
  }

  return (
  <div style={{
    margin: "auto",
    padding: "15px",
    maxWidth:"1000px",
    alignContent:"center"

  }}>
    <MDBRow className='mt-5'>
      {reports.length === 0 && location.pathname === "/" &&(
        <MDBTypography className='text-center mb-0' tag="h2">
            No Reports Found
        </MDBTypography>
        )}
        
         {reports.length === 0 && location.pathname !== "/" &&(
        <MDBTypography className='text-center mb-0' tag="h2">
            We couldn't find any match for "{searchQuery}"
        </MDBTypography>
      )}
    <MDBCol>
        <MDBContainer>
          <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
            {reports && reports.map((item) => <CardReport key={item._id} {...item}/>)}
          </MDBRow>
        </MDBContainer>
    </MDBCol>
      </MDBRow>
      {reports.length > 0 && (
   <Pagination
    setCurrentPage={setCurrentPage}
    numberOfPages={numberOfPages}
    currentPage={currentPage}
    dispatch={dispatch}
    />

      )}
   
  </div>
  
);
};

export default Home;