import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // or your preferred theme


function CreatePost() {
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
        <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
          <FileInput id='file' accept='image/*'/>
          <Button type='button' className='bg-teal-500 hover:bg-teal-600 text-white cursor-pointer size-sm' outline={true}>
            Upload Image
          </Button>
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