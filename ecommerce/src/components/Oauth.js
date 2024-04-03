import React from 'react'
import  { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
      const handleGoogleClick = async () => {
        try{
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);

          const result = await signInWithPopup(auth, provider)
          console.log(result)
          const res = await fetch('http://localhost:5000/api/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: result.user.displayName,
            email: result.user.email, 
            photo: result.user.photoURL
            })
          })
          const data = await res.json()
          console.log(data)
          dispatch(signInSuccess(data))
          navigate('/')
          console.log(data)
        }catch(err){
          console.log(err)
        }
      }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red text-white p-3 rounded-lg'>
     continue with google
    </button> 
  )
}

export default Oauth


