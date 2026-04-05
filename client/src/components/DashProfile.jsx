import { Button, Label, Spinner, TextInput, Alert } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/userSlice';
import { useRef, useState } from 'react';

function DashProfile() {
  const { currentUser } = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setImageFileUrl(URL.createObjectURL(file));
        const resSign = await fetch('/api/user/sign-image');
        const { signature, timestamp } = await resSign.json();
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('api_key', import.meta.env.VITE_Cloudinary_API_Key);
        // uploadData.append('cloud_name', import.meta.env.VITE_Cloudinary_Cloud_Name)
        uploadData.append('upload_preset', 'blog_profile')
        uploadData.append('signature', signature);
        uploadData.append('timestamp', timestamp);
        const res = await fetch('https://api.cloudinary.com/v1_1/dv8q3oyfj/image/upload', {
          method: 'POST',
          body: uploadData
        });
        const data = await res.json();
        if(data.secure_url){
          setImageUrl(data.secure_url);
          console.log(imageUrl)
          setFormData((prevData)=>({
            ...prevData, avatar: data.secure_url,
          }))
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      
    }};
    // console.log(currentUser)
    
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        setError(null);
        setLoading(true);
        setSuccess(null);
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json();
        // console.log('update response status:', res.status);
        // console.log('update data:', data);
        if(data.success === false){
          return 
        }
        setSuccess('Profile updated successfully!');
        setError(null);
        setLoading(false);
        dispatch(updateUserSuccess(data));
      } catch (error) {
        console.log(error)
      }
    }
    const handleChange = (e)=>{
      setFormData({...formData, [e.target.id]: e.target.value})
    }
    
    const handleDelete = async ()=>{
      dispatch(deleteUserStart());
      if(window.confirm('Are you sure you want to delete your account? This action cannot be undone.')){
        try {
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
          })
          const data = await res.json();
          dispatch(deleteUserSuccess(data));
          dispatch(signoutSuccess());
          setError(null);
          alert(data);
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      }
    };
    const handleSignout = async ()=>{
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        })
        const data = await res.json();
        dispatch(signoutSuccess());
        setError(null);
        alert(data);
      } catch (error) {
        setError('Error signing out. Please try again.', error);
      }
    }

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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <TextInput 
                type='text' 
                placeholder='Your username' 
                id='username'
                defaultValue={currentUser.username}
                onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
              <TextInput 
                type='email' 
                placeholder='Your email' 
                id='email' 
                defaultValue={currentUser.email}
                onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
              <TextInput 
                type='password' 
                id='password' 
                placeholder='**********'
                onChange={(e)=>handleChange(e)}
              />
            </div>
            <Button type='submit' className="bg-linear-to-r from-purple-500 to-pink-500 text-white    hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer">
              {loading ? (<><Spinner size="sm" /> Updating...</>) : 'Update Profile'}
            </Button>
            {error && <Alert color="failure">{error}</Alert>}
            {success && <Alert color="success">{success}</Alert>}
          </form>
          <div className='text-red-500 flex justify-between'>
            <span className='cursor-pointer' onClick={handleDelete}>Delete Account</span>
            <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
          </div>
        </div>
  )
}

export default DashProfile