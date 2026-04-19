import { Table, TableRow, TableHeadCell,TableHead, TableBody, TableCell, Modal, ModalHeader, ModalBody, Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTimes, FaCheck } from 'react-icons/fa';
function DashUsers() {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [usersIdToDelete, setUsersIdToDelete] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingUsers(true);
    try {
        const res = await fetch(`/api/user/getusers`,{
          credentials: 'include'
        });
        const data = await res.json();
        if(res.ok){
          setUsers(data.users);
          setLoadingUsers(false);
          // console.log(data.users)
          if(data.users.length < 9){
            setShowMore(false)
          }
        }
    } catch (error) {
      console.log(error)
      setLoadingUsers(false);
    }
  }
  if(currentUser?.isAdmin){
          fetchPosts();
    }
  }, [currentUser?._id])

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`,{
          credentials: 'include'
        });
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>[...prev, ...data.users])

        if(data.users.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteUser = async ()=>{
    setShowModal(false)
    try {
      const res = await fetch(`/api/user/deleteuser/${usersIdToDelete}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json();
      if(res.ok){
        setShowModal(false);
        setUsers((prev)=>prev.filter((user)=>user._id !== usersIdToDelete))
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(loadingUsers){
    // Larger spinner with text below
    return <div className='flex flex-col items-center mx-auto justify-center py-10 gap-4'>
      <Spinner /> 
      <span className='text-lg font-medium text-gray-500 dark:text-gray-300'>Loading...</span>
      </div>
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && users.length > 0 ? 
      <>
      <Table hoverable className='shadow-md'>
        <TableHead>
          <TableRow>
            <TableHeadCell>Date created</TableHeadCell>
            <TableHeadCell>User image</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className='divide-y'>
        {users.map((user) => 
          <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>
                <img src={user.avatar} alt={user.username} className='w-10 h-10 rounded-full object-cover bg-gray-500' />
            </TableCell>
            <TableCell>
                {user.username}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isAdmin ? <FaCheck className='text-green-500' />: <FaTimes className='text-red-500' />}</TableCell>
            <TableCell>
              <span className='font-medium text-red-500 hover:underline cursor-pointer'  
                onClick={()=>{
                    setShowModal(true); 
                    setUsersIdToDelete(user._id)}
                    }>Delete</span>
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
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-300'>Are you sure you want to delete this user? This action cannot be undone.</h3>
              <div className='flex justify-center gap-6'>
                <Button color="failure" className='bg-red-600 text-white cursor-pointer' onClick={handleDeleteUser}>
                  Yes, Delete The User
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

export default DashUsers