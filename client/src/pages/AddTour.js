import React, {useEffect,useState} from 'react'
import {MDBCard,MDBCardBody,MDBInput,MDBIcon,MDBCardFooter,MDBValidation,MDBBtn,MDBSpinner}
 from "mdb-react-ui-kit";
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';
import { useDispatch, useSelector } from 'react-redux';
import { createTour } from '../redux/feature/tourSlice';

const initialState ={
  title: "",
  description: "",
  tags: []
}
const AddTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const {title,description,tags} = tourData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {tour,error,loading} = useSelector((state) => ({...state.tour}))
  const {user} = useSelector((state) => ({...state.auth}))


  useEffect(() => {
    error && toast.error(error)
  },[error])
  const handleSubmit= (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedTour = {...tourData, name: user?.result?.name}
      dispatch(createTour({updatedTour,navigate,toast}));
      handleClear();
    }
  }
  const handleChange = (e) => {
    const {name,value} = e.target;
    setTourData({...tourData, [name]: value})
  }
  const handleAddTag = (tag) => {
    setTourData({...tourData, tags: [...tourData.tags, tag]})
  }

  const handleDeleteTag = (deletetag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter(tag => tag !== deletetag)
    
    })
  }

  const handleClear = () => {
    setTourData({title: "",description: "",tags: []})
  }
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center",marginTop: "120px"}}
      className="container"
    >
      <MDBCard alignment='center'>
        <MDBCardBody onSubmit={handleSubmit} noValidate className="row g-3">
          <h5>Add Tour</h5>
          <MDBValidation>
            <div className='col-md-12'>
              <input 
                placeholder="title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide your Title"
              />
            </div>
            <div className='col-md-12'>
              <textarea 
                placeholder="description"
                type="text"
                style={{height: "100px"}}
                value={description}
                name="description"
                onChange={handleChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide your Description"
              />
            </div>
            <div className='col-md-12'>
              <ChipInput
                placeholder="Enter Tag"
                variant="outlined"
                fullWidth
                value={tags}
                name="tags"
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className='d-flex justify-content-start'>
              <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => {
                  setTourData({...tourData, imageFile: base64})
                }}
              />
            </div>
            <div className='col-md-12'> 
              <MDBBtn style={{width: "100%"}}>Submit</MDBBtn>
              <MDBBtn 
                style={{width: "100%"}}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default AddTour
