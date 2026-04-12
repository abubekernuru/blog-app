import { Table, TableRow, TableHeadCell,TableHead, TableBody, TableCell, Modal, ModalHeader, ModalBody, Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
function DashPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  // console.log(userPosts)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPost(true);
    try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`,{
          credentials: 'include'
        });
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
          setLoadingPost(false);
          // console.log(data.posts)
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
    } catch (error) {
      console.log(error)
      setLoadingPost(false);
    }
  }
  if(currentUser?.isAdmin){
          fetchPosts();
    }
  }, [currentUser?._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,{
          credentials: 'include'
        });
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev)=>[...prev, ...data.posts])
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeletePost = async ()=>{
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json();
      if(res.ok){
        setShowModal(false);
        setUserPosts((prev)=>prev.filter((post)=>post._id !== postIdToDelete))
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(loadingPost){
    // Larger spinner with text below
    return <div className='flex flex-col items-center mx-auto justify-center py-10 gap-4'>
      <Spinner /> 
      <span className='text-lg font-medium text-gray-500 dark:text-gray-300'>Loading...</span>
      </div>
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && userPosts.length > 0 ? 
      <>
      <Table hoverable className='shadow-md'>
        <TableHead>
          <TableRow>
            <TableHeadCell>Date updated</TableHeadCell>
            <TableHeadCell>Post image</TableHeadCell>
            <TableHeadCell>Post title</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
            <TableHeadCell><span>Edit</span></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className='divide-y'>
        {userPosts.map((post) => 
          <TableRow key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Link to={`/post/${post.slug}`}>
                <img src={post.image} alt={post.title} className='w-20 h-10 object-cover rounded bg-gray-500' />
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                {post.title}
              </Link>
            </TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell>
              <span className='font-medium text-red-500 hover:underline cursor-pointer'  
                onClick={()=>{
                    setShowModal(true); 
                    setPostIdToDelete(post._id)}
                    }>Delete</span>
            </TableCell>
            <TableCell>
              <Link to={`/updatepost/${post._id}`} className='font-medium text-teal-500 hover:underline cursor-pointer'>
              <span>Edit</span>
              </Link>
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
      {showMore && (
            <button
              onClick={handleShowMore}
              className='cursor-pointer w-full text-teal-600 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        <Modal show={showModal} onClose={()=>setShowModal(false)} size="md" popup={true}>
          <ModalHeader />
          <ModalBody>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto mt-3'/>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-300'>Are you sure you want to delete this post? This action cannot be undone.</h3>
              <div className='flex justify-center gap-6'>
                <Button color="failure" className='bg-red-600 text-white cursor-pointer' onClick={handleDeletePost}>
                  Yes, Delete The Post
                </Button>
                <Button color="gray" onClick={()=>setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
      : <h2 className='text-2xl font-bold mb-4'>You are not authorized to view this page</h2>}
    </div>
  )
}

export default DashPosts