import { Table, TableRow, TableHeadCell,TableHead, TableBody, TableCell } from 'flowbite-react'
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
function DashPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const {currentUser} = useSelector((state) => state.user);
  console.log(userPosts)
  useEffect(() => {
    const fetchPosts = async () => {
    try {
        const response = await fetch(`/api/post/getposts?userId=${currentUser._id}`,{
          credentials: 'include'
        });
        const data = await response.json();
        setUserPosts(data.posts);
        console.log(data.posts)
    } catch (error) {
      console.log(error)
    }
  }
  if(currentUser?.isAdmin){
          fetchPosts();
    }
  }, [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
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
              <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
            </TableCell>
            <TableCell>
              <span className='font-medium text-teal-500 hover:underline cursor-pointer'>Edit</span>
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DashPosts