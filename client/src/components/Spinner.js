import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'
const Spinner = () => {
  return (
    <div className="spinner">
      <MDBSpinner className='me-2' style={{height: "3rem",width: "3rem", marginTop: "100px"}}>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </div>
  )
}

export default Spinner
