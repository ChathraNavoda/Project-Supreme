import React, {useEffect} from 'react';
import {MDBCard, MDBCardBody, MDBCardText,MDBCardImage,MDBContainer,MDBIcon, MDBBtn} from "mdb-react-ui-kit";
import {useDispatch,useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import moment from "moment";
import { getRelatedReports, getReport } from '../redux/features/reportSlice';
import RelatedReports from '../components/RelatedReports';



const SingleReport = () => {

    const dispatch = useDispatch();
    const {report, relatedReports} =useSelector((state)=> ({...state.report}));
    const { id } = useParams(); 
    const navigate = useNavigate();
    const tags = report?.tags

    useEffect(()=>{
        tags && dispatch(getRelatedReports(tags));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tags]);

    useEffect(() =>{

        if(id){
            dispatch(getReport(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

  return (
    <>
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage
            position='top'
            style={{width: "100%", maxHeight:"600px"}}
            src={report.imageFile}
            alt={report.title}
            />
                  <MDBCardBody>
                      <MDBBtn tag="a" color='none' style={{ float: "left", color: "#000" }} onClick={() => navigate("/")}>
                          <MDBIcon
                              fas
                              size='lg'
                              icon='long-arrow-alt-left'
                              style={{float:"left"}}
                          />

                      </MDBBtn>
                <h3>{report.title}</h3>
                <span>
                    <p className='text-start reportName'>Created By: {report.name}</p>
                </span>
                <div style={{float: "left"}}>
                    <span className='text-start'>
                        {report && report.tags && report.tags.map((item)=> `#${item}`)}
                    </span>
                </div>
                <br/>
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon
                    style={{float:"left", margin:"5px"}}
                    far
                    icon='calendar-alt'
                    size='lg'
                    />
                    <small className='text-muted'>
                        {moment(report.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>
                    {report.description}
                </MDBCardText>
            </MDBCardBody>
            <RelatedReports relatedReports={relatedReports} reportId={id}/>
        </MDBCard>
    </MDBContainer>
    </>
  )
}

export default SingleReport