import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Textarea, Button, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CommentList from './CommentList.jsx';

function Comment({postId}) {
    const { currentUser } = useSelector((state)=>state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentError(null)
        if(comment.length > 200){
            return;
        }
        try {
            const res = await fetch(`/api/comment/createcomment`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment,
                    userId: currentUser._id,
                    postId
                })
            })
            const data = await res.json();
            // console.log(data)
            if(res.ok){
                setComment('')
                setComments([data, ...comments]);
                setCommentError(null)
            }
            if(!res.ok){
                setCommentError(data.message)
            }
        } catch (error) {
            console.log(error)
            setCommentError(error.message)
        }
    }

    const handleChange = async (e)=> {
        setComment(e.target.value)
    }
// console.log(comment)
useEffect(()=>{
    const getComments = async ()=>{
        try {
            setCommentError(null)
            const res = await fetch(`/api/comment/getcomment/${postId}`);
            const data = await res.json();
            if(res.ok){
                setComments(data);
            }
            if(!res.ok){
                setCommentError(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    getComments();
},[postId])
// console.log(comments)
return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img
                className='h-5 w-5 object-cover rounded-full'
                src={currentUser.avatar}
                alt='profile picture'
            />
            <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
            >
                @{currentUser.username}
            </Link>
        </div>
        ) : (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
            <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                Sign In
            </Link>
            </div>
        )}
    {currentUser &&
        <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
            <Textarea
                placeholder='Add a comment...'
                rows='3'
                maxLength='200'
                onChange={(e)=>handleChange(e)}
                value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
                <p className='text-gray-500 text-xs'>
                {200 - comment.length} characters remaining
            </p>
            <Button
                className="cursor-pointer border border-purple-500 text-purple-700 px-4 py-2 rounded-md transition-all duration-200 bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent"
                type='submit'
            >
                Submit
            </Button>
            </div>
                {commentError && 
                <Alert className='mt-5' color='failure'>
                        {commentError}
                </Alert>
                }
        </form>
    }
    {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
    ):(
        <>       
        <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-500 py-1 px-2'>
                {comments.length}
            </div>
        </div>
        {
            comments.map((comment)=> (
                <CommentList 
                key={comment._id}
                comment={comment}
                />
            ))
        }
        </>
    )}
        </div>
)  
}

export default Comment