import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


const Products = () => {
  const navigate = useNavigate()


  return (
    <>
      <h2>Products</h2>
      <button onClick={() => navigate('/admin/products/create-products')}>
        Create
      </button>
      <Outlet/>
    </>
  )
}

export default Products
