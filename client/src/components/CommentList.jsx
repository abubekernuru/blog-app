import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';

function CommentList({comment, onLike, currentUser}) {
    const [user, setUser] = useState({})

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
        </div>
        </div>
    </div>
  )
}

export default CommentList;