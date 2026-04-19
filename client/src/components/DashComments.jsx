import { Table, TableRow, TableHeadCell,TableHead, TableBody, TableCell, Modal, ModalHeader, ModalBody, Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTimes, FaCheck } from 'react-icons/fa';
function DashUsers() {
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [commentsIdToDelete, setCommentsIdToDelete] = useState(null);
    const [loadingComments, setLoadingComments] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
  // console.log(comments)
    useEffect(() => {
    const fetchComments = async () => {
        setLoadingComments(true);
    try {
        const res = await fetch(`/api/comment/getComments`,{
            credentials: 'include'
        });
        const data = await res.json();
        if(res.ok){
            setComments(data.comments);
            setLoadingComments(false);
            // console.log(data)
            if(data.comments.length < 9){
            setShowMore(false)
            }
        }
    } catch (error) {
        console.log(error)
        setLoadingComments(false);
    }
    }
    if(currentUser?.isAdmin){
        fetchComments();
    }
}, [currentUser?._id])

const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
        const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`,{
            credentials: 'include'
        });
        const data = await res.json();
        if(res.ok){
        setComments((prev)=>[...prev, ...data.comments])

        if(data.length < 9){
            setShowMore(false)
        }
    }
    } catch (error) {
        console.log(error)
    }
    }
const handleDeleteComment = async ()=>{
    setShowModal(false)
    try {
        const res = await fetch(`/api/comment/deletecomment/${commentsIdToDelete}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        const data = await res.json();
        if(res.ok){
            setShowModal(false);
            setComments((prev)=>prev.filter((comment)=>comment._id !== commentsIdToDelete))
        }else{
        console.log(data.message)
        }
    } catch (error) {
        console.log(error)
    }
    }
    if(loadingComments){
    // Larger spinner with text below
    return <div className='flex flex-col items-center mx-auto justify-center py-10 gap-4'>
        <Spinner /> 
            <span className='text-lg font-medium text-gray-500 dark:text-gray-300'>Loading...</span>
        </div>
    }

    return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser?.isAdmin && comments.length > 0 ? 
        <>
        <Table hoverable className='shadow-md'>
        <TableHead>
            <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Comment content</TableHeadCell>
                <TableHeadCell>Number of likes</TableHeadCell>
                <TableHeadCell>PostId</TableHeadCell>
                <TableHeadCell>UserId</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
            </TableRow>
        </TableHead>
        <TableBody className='divide-y'>
        {comments.map((comment) => 
            <TableRow key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>{comment.comment}</TableCell>
            <TableCell>
              {/* <Link to={`/post/${comment.slug}`} className='font-medium text-gray-900 dark:text-white'> */}
                {comment.numberOfLikes}
            </TableCell>
            <TableCell>{comment.postId}</TableCell>
            <TableCell>{comment.userId}</TableCell>
            <TableCell>
                <span className='font-medium text-red-500 hover:underline cursor-pointer'  
                onClick={()=>{
                    setShowModal(true); 
                    setCommentsIdToDelete(comment._id)}
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
                <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-300'>Are you sure you want to delete this comment?</h3>
                <div className='flex justify-center gap-6'>
                <Button color="failure" className='bg-red-600 text-white cursor-pointer' onClick={handleDeleteComment}>
                    Yes
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