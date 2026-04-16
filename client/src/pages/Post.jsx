import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import Comment from '../components/Comment';

function Post() {
    const [loading, setLoading] = useState();
    const [post, setPost] = useState();
    const { currentUser } = useSelector((state)=>state.user);
    const {postSlug} = useParams();

    useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true);
    try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`,{
            credentials: 'include'
        });
        const data = await res.json();
        if(res.ok){
            setPost(data.posts[0]);
            setLoading(false);
            // console.log(data.posts)
        }
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
    }
        fetchPosts();
    }, [postSlug])
    if(loading){
    // Larger spinner with text below
    return <div className='flex items-center justify-center min-h-screen'>
                <Spinner size='xl' /> 
            </div>
    }
    // console.log(post)
    return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen '>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
        <Link 
            to={`/search?category=${post && post.category}`}
            className='self-center mt-5'
            >
                <Button className='cursor-pointer' color='gray' pill size='xs'>
                    {post && post.category}
                </Button>
            </Link>
        <img 
            src={post && post.image} 
            alt={post && post.title}
            className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />
        <div
                className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>
                {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span 
                className='italic'>
                {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
        </div>
        <div 
            className='p-3 max-w-2xl mx-auto w-full post-content'
            dangerouslySetInnerHTML={{__html: post && post.content}}>
        </div>
        <div>
            <CallToAction />
        </div>
        <Comment postId={post && post._id}/>
        </main>
    )
}

export default Post