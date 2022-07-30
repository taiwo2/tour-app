import React from 'react'
import { useSelector } from 'react-redux';
import Redirect from './Redirect';

const PrtivateRoute = ({children}) => {
  const {user} = useSelector((state) => ({...state.auth}))
  return (
    <div>
      {user ? children : <Redirect />};
    </div>
  )
}

export default PrtivateRoute;
