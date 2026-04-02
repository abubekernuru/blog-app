import { Button, Label, Spinner, TextInput, Alert } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

function DashProfile() {
  const {currentUser} = useSelector((state)=> state.user);
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setImageFileUrl(URL.createObjectURL(file));
        const resSign = await fetch('http://localhost:3002/api/users/sign-image');
        const { signature, timestamp } = await resSign.json();
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('api_key', import.meta.env.VITE_Cloudinary_API_Key);
        uploadData.append('signature', signature);
        uploadData.append('timestamp', timestamp);
        const res = await fetch('https://api.cloudinary.com/v1_1/dv8q3oyfj/image/upload', {
          method: 'POST',
          body: uploadData
        });
        const data = await res.json();
        setImageUrl(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      
    }};
    // console.log(imageUrl)
  return (
    <div className='max-w-lg mx-auto p-3 w-full flex flex-col gap-5'>
          <h1 className='text-3xl text-center font-semibold my-5 text-gray-800 dark:text-white'>Profile</h1>
            <input type="file" hidden ref={fileInputRef} onChange={(e)=>handleFileChange(e)} />
          <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img 
              src={imageFileUrl || imageUrl || currentUser.avatar}
              alt="Profile" 
              onClick={()=>fileInputRef.current?.click()}
              className='rounded-full w-full h-full self-center object-cover border-8 border-[lightgray]'
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