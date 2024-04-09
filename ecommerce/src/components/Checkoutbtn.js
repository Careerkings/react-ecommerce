import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Checkoutbtn = () => {
    const {currentUser} = useSelector(state => state.user)
    const {cartItems} = useSelector(state => state.cart)

    const handleCheckout = async () => {
         try { 
         const res = await fetch('http://localhost:5000/api/stripe', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItems,
            userid: currentUser._id
          })
      });
      console.log(res)
      const data = await res.json()
      console.log(data)
      if(data.url) {
        window.location.href = data.url
      }
  
 } catch(err) {
       console.log(err.message)
}}

  return (
    <div>
      <button onClick={() => handleCheckout()}>Check out</button>
    </div>
  )
}

export default Checkoutbtn
