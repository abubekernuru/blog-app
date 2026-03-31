import { Button, Label, Spinner, TextInput, Alert } from 'flowbite-react';
import { useSelector } from 'react-redux';

function DashProfile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full flex flex-col gap-5'>
          <h1 className='text-3xl text-center font-semibold my-5 text-gray-800 dark:text-white'>Profile</h1>
          <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img 
              src={currentUser.avatar}
              alt="Profile" 
              className='rounded-full w-full h-full selfce object-cover border-8 border-[lightgray]'
              />
          </div>
          <form className='flex flex-col gap-4'>
            <div>
              <TextInput 
                type='text' 
                placeholder='Your username' 
                id='username'
                defaultValue={currentUser.username}
                />
            </div>
            <div>
              <TextInput 
                type='email' 
                placeholder='Your email' 
                id='email' 
                defaultValue={currentUser.email}
                />
            </div>
            <div>
              <TextInput 
                type='password' 
                id='password' 
                placeholder='**********'
              />
            </div>
            <Button type='submit' className="bg-linear-to-r from-purple-500 to-pink-500 text-white    hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer">
              Update Profile
            </Button>
          </form>
          <div className='text-red-500 flex justify-between'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
          </div>
        </div>
  )
}

export default DashProfile