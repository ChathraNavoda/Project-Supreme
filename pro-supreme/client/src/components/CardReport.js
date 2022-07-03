import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText, 
    MDBCardImage, 
    MDBCardGroup, 
    MDBBtn,
    MDBIcon,
    MDBTooltip
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { likeReport } from  "../redux/features/reportSlice.js";

const CardReport = ({
    imageFile,
    description,
    title,
    tags,
    _id,
    name,
    likes,
  }) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id || user?.result?.googleId;

const dispatch = useDispatch();

const excerpt = (str) => {
    if(str.length > 60){
        str = str.substring(0, 60) + " ..."
    }
    return str;
}

const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people checked`}
            >
              {likes.length} Checked
            </MDBTooltip>
          ) : (
            `${likes.length} Check${likes.length > 1 ? "ed" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Check" : "Checked"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Check
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeReport({ _id }));
  };

  return (
    <MDBCardGroup>
        <MDBCard className='h-100 mt-2 d-sm-flex' style={{maxWidth:"20rem"}}>
            <MDBCardImage
            src={imageFile}
            alt={title}
            position='top'
            style={{maxWidth:"100%", height:"180px"}}  
            />
            <div className='top-left'>{name}</div>
            <span className="text-start tag-card">
                {tags.map((tag, index) => (
                 <Link key={index} to={`/reports/tag/${tag}`}>#{tag}</Link>   
                ))}

                <MDBBtn 
                style={{float: "right"}} 
                tag="a" color='none' 
                onClick={!user?.result ? null : handleLike}
                >
                {!user?.result ? (
                    <MDBTooltip title="Please login to check the report" tag="a">
                        <Likes/>
                    </MDBTooltip>
                ):(
                    <Likes/>
                )}
                
                </MDBBtn>
            </span>
            <MDBCardBody>
                <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                <MDBCardText className='text-start'>{excerpt(description)}
                <Link to={`/report/${_id}`}>
                    Read More
                </Link>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardReport;