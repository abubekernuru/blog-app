import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

function Signup() {
  return (
  <div className='min-h-screen mt-20'>
    <div className='flex flex-col md:flex-row md:items-center mx-w-3xl mx-auto p-6 gap-10'>
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
          <form className='flex flex-col gap-4 ' >
            <div>
              <div className="mb-2 block ">
                <Label htmlFor='username' className='dark:text-black'>Your username</Label>
                </div>
              <TextInput type='text' placeholder='Your username' />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor='email' className='dark:text-black'>Your email</Label>
              </div>
              <TextInput type='email' placeholder='Your email' />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor='password' className='dark:text-black'>Your password</Label>
              </div>
              <TextInput type='password' placeholder='Your password' />
            </div>
            <Button type='submit' className='bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded cursor-pointer'>
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