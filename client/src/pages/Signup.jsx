import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  // console.log(formData)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3002/api/auth/signup', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success === false) {
      return console.log(data.message); 
    }
      console.log(data)
      setFormData({})
      navigate('/')
    } catch (error) {
      console.log(error.message)
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
          <h2 className='text-2xl font-bold mb-4'>Create an account</h2>
          <p className='text-sm text-gray-600 mb-4'>Fill in the form below to create your account.</p>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block ">
                <Label htmlFor='username' className='dark:text-black'>Your username</Label>
                </div>
              <TextInput type='text' placeholder='Your username' id='username' onChange={(e)=>handleChange(e)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor='email' className='dark:text-black'>Your email</Label>
              </div>
              <TextInput type='email' placeholder='Your email' id='email' onChange={(e)=>handleChange(e)}  />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor='password' className='dark:text-black'>Your password</Label>
              </div>
              <TextInput type='password' id='password' placeholder='Your password' onChange={(e)=>handleChange(e)}  />
            </div>
            <Button type='submit' className='bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded cursor-pointer' >
              Sign Up
            </Button>
          </form>
          <div className='mt-4 text-center'>
            <p className='text-sm'>Already have an account? <Link to={'/signin'} className='text-blue-500 hover:underline'>Log in</Link></p>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Signup