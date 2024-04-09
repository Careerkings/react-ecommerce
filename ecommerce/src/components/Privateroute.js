import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const Privateroute = () => {
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser)
 
    return (
    <>{ currentUser._id ?
      <Outlet/> :
      <Navigate to='/signin'/>
    }
    </>
  )
}

export default Privateroute
 