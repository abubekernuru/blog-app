import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { Button, Modal, ModalBody, ModalHeader, Textarea } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function Comment({comment, onLike, currentUser, onEdit, onDelete}) {
    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);   
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const getUser = async ()=>{
            try {
                const res = await fetch(`/api/user/getuser/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    },[comment])
    // console.log(user)

    const handleEdit = async ()=>{
        setIsEditing(true);
        setEditedComment(comment.comment);
    }
    const handleSave = async ()=>{
        try {
            const res = await fetch(`/api/comment/editcomment/${comment._id}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    comment: editedComment
                })
            })
            const data = await res.json();
            if(res.ok){
                setIsEditing(false);
                onEdit(comment._id, editedComment);
            }
        } catch (error) {
            console.error('Error saving comment:', error);
        }
    }
    const handleDelete = async ()=>{
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            setShowModal(false);
            const res = await fetch(`/api/comment/deletecomment/${comment._id}`,{
                method: 'DELETE',
                credentials: 'include',
            })
            const data = await res.json();
            if(res.ok){
                onDelete(comment._id);
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img src={user.avatar} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
        </div>
        
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`: 'Anonymous user'}</span>
                <span className='text-gray-500 text-xs'>
                {moment(comment.createdAt).fromNow()}
                </span>
            </div>
            {isEditing ? (
            <>
            <Textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className='w-full'
            />
            <div className='flex gap-2 mt-2 items-center justify-end'>
                <Button className='cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white' size='sm'
                    onClick={handleSave}
                >Save</Button>
                <Button className='outline outline-purple-500 outline-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white dark:text-black' size='xs'
                    onClick={()=>setIsEditing(false)}
                >Cancel</Button>
            </div>
            </>) : (<>
        <p className='text-gray-500 pb-2'>{comment.comment}</p>
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
            <button
                onClick={() => onLike(comment._id)}
                className={`hover:text-blue-500 cursor-pointer ${currentUser && comment.likes.includes(currentUser._id) ? '!text-blue-500' : '!text-gray-500'}`}
            >
                <FaThumbsUp />
            </button>
            <p className='text-gray-400 text-xs ml-1'>{comment.numberOfLikes > 0 &&
                comment.numberOfLikes +
                    ' ' +
                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
            </p>
            {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
            <div className='flex gap-3 text-gray-400 text-xs ml-1'>
                <button className='hover:text-blue-500 cursor-pointer' onClick={handleEdit}>
                    Edit
                </button>
                <button className='hover:text-red-500 cursor-pointer' onClick={()=>setShowModal(true)}>
                    Delete
                </button>
            </div>
            )}           
        </div>
        </>)}
        </div>
        <Modal show={showModal} onClose={()=>setShowModal(false)} size="sm" popup={true}>
            <ModalHeader />
            <ModalBody>
                <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto mt-3'/>
                <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-300'>Are you sure you want to delete your comment?</h3>
                <div className='flex justify-center gap-6'>
                    <Button color="failure" className='bg-red-600 text-white cursor-pointer' onClick={handleDelete}>
                    Yes
                    </Button>
                    <Button color="gray" onClick={()=>setShowModal(false)} className='cursor-pointer outline outline-gray-500 outline-2 hover:bg-gray-500 hover:text-white'>
                    Cancel
                    </Button>
                </div>
                </div>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default Comment;