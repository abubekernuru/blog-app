import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Label, Spinner, TextInput, Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from '../redux/userSlice';
import OAuth from '../components/OAuth';

function Signin() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){    
      return dispatch(signinFailure("All fields are required"));
    }
    try {
      dispatch(signinStart());
      const res = await fetch('http://localhost:3002/api/auth/signin', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      // console.log(data)
      if (data.success === false) {
      return dispatch(signinFailure(data.message));  
    }
      setFormData({})
      dispatch(signinSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  }
  return (
  <div className='min-h-screen mt-10'>
    <div className='flex flex-col md:flex-row md:items-center max-w-4xl mx-auto p-6 gap-10'>
      <div className='flex flex-col items-center gap-4 flex-1'>
        <Link to={'/'} className=' text-4xl  font-bold'>
          <span className='px-2 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg'>
            Abuki's
          </span>
          Blog
        </Link>
        <p className='mt-5 text-sm'>Welcome to Abuki's Blog! We are excited to have you here. This is a simple blog where you can find various articles and updates.</p>
    </div>
        <div className='flex-1'>
          <h2 className='text-2xl font-bold mb-4'>Sign in</h2>
          <p className='text-sm text-gray-600 mb-4'>Fill in the form below to sign in</p>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor='email' className='dark:text-white'>Your email</Label>
              </div>
              <TextInput type='email' placeholder='Your email' id='email' value={formData.email || ''} onChange={(e)=>handleChange(e)}  />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor='password' className='dark:text-white'>Your password</Label>
              </div>
              <TextInput type='password' id='password' placeholder='Your password' value={formData.password || ''} onChange={(e)=>handleChange(e)}  />
            </div>
            <Button type='submit' className='bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded cursor-pointer' disabled={loading}>
              {loading ? 
              <>
                <Spinner aria-label="Loading Spinner" size="sm" />
                <span className='ml-2'>Loading...</span>
              </> :
              "Sign In"}
            </Button>
            <OAuth />
          </form>
          <div className='mt-4 text-center'>
            <p className='text-sm'>Don't have an account? <Link to={'/signup'} className='text-blue-500 hover:underline'>Sign up</Link></p>
          </div>
            {error && <Alert className='mt-5' color='failure'>
              {error}
            </Alert>}
        </div>
    </div>
  </div>
  )
}

export default Signin