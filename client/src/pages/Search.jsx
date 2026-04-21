import { Button, Dropdown, DropdownItem, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

const apiUrl = import.meta.env.VITE_API_URL;

function Search() {
    const [searchData, setSearchData] = useState({
        searchTerm: "",
        category: "uncategorized",
        order: "desc"
    });
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTermFromUrl = searchParams.get('searchTerm');
        const categoryFromUrl = searchParams.get('category');
        const orderFromUrl = searchParams.get('order');

        if(searchTermFromUrl || categoryFromUrl || orderFromUrl){
            setSearchData({
                searchTerm:searchTermFromUrl || '',
                category: categoryFromUrl || 'uncategorized',
                order: orderFromUrl || 'desc'
            })
        }
        const fetchPosts = async ()=> {
            try {
                setLoading(true);
                setShowMore(false);
                const searchQuery = searchParams.toString()
                const res = await fetch(`${apiUrl}/api/post/getposts?${searchQuery}`);
                const data = await res.json();
                if(res.ok){
                    setPosts(data.posts);
                    if (data.posts.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [location.search])

    const handleChange = async (e)=>{
        if (e.target.id === 'category') {
            setSearchData({ ...searchData, category: e.target.value });
        }
        if (e.target.id === 'searchTerm') {
            setSearchData({ ...searchData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            setSearchData({ ...searchData, order: e.target.value });
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const searchParams = new URLSearchParams();
        if(searchData.searchTerm){
            searchParams.set('searchTerm', searchData.searchTerm);
        }
        if(searchData.category && searchData.category !== 'uncategorized'){
            searchParams.set('category', searchData.category);
        }
        if(searchData.order){
            searchParams.set('order', searchData.order);
        }
        const searchQuery = searchParams.toString();
        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async ()=>{
        try {
            setShowMoreLoading(true);
            const startIndex = posts.length;
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('startIndex', startIndex);
            const searchQuery = urlParams.toString();
            const res = await fetch(`${apiUrl}/api/post/getposts?${searchQuery}`)
            if(!res.ok){
                return;
            }
            if(res.ok){
                setShowMoreLoading(false);
                const data = await res.json();
                setPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex   items-center gap-2'>
                        <label htmlFor="searchTerm" className='whitespace-nowrap font-semibold'>Search:</label>
                        <TextInput
                            type="text"
                            id='searchTerm'
                            onChange={handleChange}
                            placeholder='Search...'
                            value={searchData.searchTerm}
                            />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Category:</label>
                        <Select
                        onChange={handleChange}
                        value={searchData.category}
                        id='category'
                        >
                            <option value='uncategorized'>Uncategorized</option>
                            <option value='tech'>React.js</option>
                            <option value='nextjs'>Next.js</option>
                            <option value='javascript'>JavaScript</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="sort" className='font-semibold'>Sort:</label>
                            <Select name="sort" id="sort" onChange={handleChange} value={searchData.order}>
                                <option value="asc">Oldest</option>
                                <option value="desc">Latest</option>
                            </Select>
                    </div>
                    <Button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-md transition-all duration-200 cursor-pointer'>Apply Filters</Button>
                </form>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
                    Posts results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )}
                    {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                    {!loading &&
                        posts &&
                        posts.map((post) => <PostCard key={post._id} post={post} />)}
                    {showMore && (
                        <button
                        onClick={handleShowMore}
                        className='text-teal-500 text-lg hover:underline p-7 w-full cursor-pointer'
                        >
                            {showMoreLoading ? 'Loading...' : 'Show More'}
                        </button>
                    )}
                </div>
                </div>
        </div>
    )
}

export default Search


