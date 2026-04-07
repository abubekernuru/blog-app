import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // or your preferred theme


function CreatePost() {

const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [imageUrl, setImageUrl] = useState(null);
const [formData, setFormData] = useState({});


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }
};

const handleUploadImage = async () => {
  if (!imageFile) {
    console.log("No file selected");
    return;
  }

  try {
    const resSign = await fetch('/api/user/sign-image');
    const { signature, timestamp } = await resSign.json();

    const uploadData = new FormData();
    uploadData.append('file', imageFile);
    uploadData.append('api_key', import.meta.env.VITE_Cloudinary_API_Key);
    uploadData.append('upload_preset', 'blog_profile');
    uploadData.append('signature', signature);
    uploadData.append('timestamp', timestamp);

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dv8q3oyfj/image/upload',
      {
        method: 'POST',
        body: uploadData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setImageUrl(data.secure_url);

      setFormData((prev) => ({
        ...prev,
        image: data.secure_url,
      }));
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' id='title' required className='flex-1'/>
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='tech'>Technology</option>
            <option value='design'>Design</option>
            <option value='history'>History</option>
          </Select>
        </div>
{/*         <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
          <FileInput id='file' accept='image/*' onChange={handleFileChange} />
          <Button type='button' className='bg-teal-500 hover:bg-teal-600 text-white cursor-pointer size-sm' outline={true} onClick={handleUploadImage} disabled={!imageFile}>
            Upload Image
          </Button>
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="w-full h-60 object-cover" />
          )}
        </div> */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-4">
  <label className="cursor-pointer flex flex-col items-center gap-2">
    <span className="text-gray-500">Click to select an image</span>
    <FileInput
      accept="image/*"
      onChange={handleFileChange}
      className="hidden"
    />
  </label>
  {imagePreview && (
    <div className="w-full flex flex-col items-center gap-3">
      <img
        src={imagePreview}
        alt="preview"
        className="w-full max-h-72 object-contain overflow-hidden rounded-lg shadow "
      />
      <div className="flex gap-5">
        <Button
          type="button"
          onClick={handleUploadImage}
          disabled={!imageFile}
          className='bg-teal-500 hover:bg-teal-600 text-white cursor-pointer size-sm'
        >
          Upload
        </Button>

        <Button
          type="button"
          color="red"
          className='cursor-pointer'
          onClick={() => {
            setImageFile(null);
            setImagePreview(null);
            setImageUrl(null);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  )}

</div>
        <ReactQuill theme="snow" placeholder='Write your post content here...' className='h-72 mb-12'/>
        <Button type='button' className='bg-linear-to-r from-purple-500 to-pink-500 text-white hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer'>
          Publish
        </Button>
      </form>
    </div>
  )
}

export default CreatePost