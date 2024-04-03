import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInPending, signInSuccess } from '../redux/userSlice'
import Oauth from '../components/Oauth'

const Signup = () => {
    const [formData, setFormData] = useState({});
    const {  loading, error } = useSelector(state => state.user);
 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
        
    };


  
    const handleSubmit = async (e) => {
      e.preventDefault()

            try{ 
                dispatch(signInPending())
             
                const res = await fetch('http://localhost:5000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const userData = await res.json()
                                         
                if(userData.success === false) {
                    dispatch(signInFailure(userData.message))
                    return;
                }
                 dispatch(signInSuccess(userData))
                navigate('/signin')
            
           } catch(err) {
          dispatch(signInFailure(err.message))
        }
  };

  return (
    <>
    <div>
      <h2>sign up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' onChange={handleChange}/>
        <button disabled={loading}>{loading ? 'loading...' : 'signup'}</button>
        <Oauth/> 
      </form>
      <div>
        <p>Have an account ?</p>
        <Link to='/signin'>
        <span>signin</span>
        </Link>
      </div>
      <div>{error && <p>{error}</p>}</div>
      </div>
    </>
  )
}

export default Signup
