import React, {useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom';
const Redirect = () => {

  const [count,setCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    },1000)
    return () => {clearInterval(interval)};

  }, [count,navigate])
  return (
    <div style={{marginTop: "100px"}}>
      <h5>Redirecting you in {count} seconds </h5>
    </div>
  )
}

export default Redirect;
