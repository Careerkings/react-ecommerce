import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInPending, signInSuccess } from '../redux/userSlice'
import Oauth from '../components/Oauth'

const Signin = () => {
    const [formData, setFormData] = useState({})
    const {  error, loading } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
        console.log(formData)
    }


  
    const handleUserFetch = async (e) => {
      e.preventDefault()

            try{ 
                dispatch(signInPending())
             
                const res = await fetch('http://localhost:5000/api/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                console.log(res)
                const userData = await res.json()
                console.log(userData)
                navigate('/signin')
               
                if(userData.success === false) {
                    dispatch(signInFailure(userData.message))
                    return;
                }
                 dispatch(signInSuccess(userData))
                navigate('/')
            
           } catch(err) {
          dispatch(signInFailure(err.message))
        }
  }


  return (
    <div>
      <h2>sign in</h2>
      <form onSubmit={handleUserFetch}>
        <input type="email" placeholder='email' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' onChange={handleChange}/>
        <button  disabled={loading}>{loading ? 'loading...' : 'signin'}</button>
        <Oauth/> 
      </form>
      <div>
        <p>Dont have an account ?</p>
        <Link to='/signup'>
        <span>signup</span>
        </Link>
      </div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  )
}

export default Signin
