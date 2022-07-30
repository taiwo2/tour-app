import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'
const Spinner = () => {
  return (
    <MDBSpinner className='me-2' style={{height: "3rem",width: "3rem", marginTop: "100px"}}>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  )
}

export default Spinner
