import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <h3>Quick Links</h3>
    <NavLink className={(isActive) => isActive ?
       'link=active' : 'link-inactive'} to='/admin/summary'>
        Summary
    </NavLink>
    <NavLink className={(isActive) => isActive ? 
      'link=active' : 'link-inactive'} to='/admin/products'>
        Product
    </NavLink>
    <div>
        <Outlet/>
    </div>
    </>
  )
}

export default Dashboard
