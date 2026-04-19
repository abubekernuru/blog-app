import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {HiArrowNarrowUp, HiOutlineAnnotation, HiOutlineDocumentText, HiOutlineUserGroup} from 'react-icons/hi'
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'


function DashboardComp() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [lastMonthUsers, setLastMonthUsers] = useState(0)
  const [lastMonthPosts, setLastMonthPosts] = useState(0)
  const [lastMonthComments, setLastMonthComments] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const {currentUser} = useSelector((state) => state.user)

  useEffect(() =>{
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`)
        const data = await res.json()
        setUsers(data.users)
        setTotalUsers(data.totalUsers)
        setLastMonthUsers(data.lastMonthUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`)
        const data = await res.json()
        setPosts(data.posts)
        setTotalPosts(data.totalPosts)
        setLastMonthPosts(data.lastMonthPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`)
        const data = await res.json()
        setComments(data.comments)
        setTotalComments(data.totalComments)  
        setLastMonthComments(data.lastMonthComments)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    if(currentUser.isAdmin){
      fetchUsers()
      fetchPosts()
      fetchComments()
    }
  },[currentUser])

  return (
    <div className='p-3 md:mx-auto'>

      <div className='flex flex-wrap gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg shadow-lg'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase' >Total Users</h3>
              <p>{totalUsers}</p>
            </div>
              <HiOutlineUserGroup  className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
            </div>
            <div>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg shadow-lg'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase' >Total Posts</h3>
              <p>{totalPosts}</p>
            </div>
              <HiOutlineDocumentText  className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
            </div>
            <div>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg shadow-lg'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase' >Total Comments</h3>
              <p>{totalComments}</p>
            </div>
              <HiOutlineAnnotation  className='bg-amber-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
            </div>
            <div>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2'>
          <div className='flex justify-between font-semibold items-center text-sm p-3'>
            <h1>Recent Users</h1>
            <Button className='cursor-pointer outline-2 outline-pink-400 hover:bg-gradient-to-r from-purple-500 to-pink-500'>
              <a href="/dashboard?tab=users">See All</a>
            </Button>
          </div>
          <Table hoverable={true} className='text-sm'>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>username</TableHeadCell>
            </TableHead>
            {users.map((user) => (
              <TableBody key={user._id} className='divide-y'>
                <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700 '>
                  <TableCell>
                    <img src={user.avatar} alt={user.username} className='w-10 h-10 rounded-full object-cover bg-gray-500'/>
                  </TableCell>
                  <TableCell>
                    <Link to={`/profile/${user.username}`}>{user.username}</Link>
                    </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2'>
          <div className='flex justify-between font-semibold items-center text-sm p-3'>
            <h1>Recent Posts</h1>
            <Button className='cursor-pointer outline-2 outline-pink-400 hover:bg-gradient-to-r from-purple-500 to-pink-500'>
              <a href="/dashboard?tab=users">See All</a>
            </Button>
          </div>
          <Table hoverable={true} className='text-sm'>
            <TableHead>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
            </TableHead>
            {posts.map((post) => (
              <TableBody key={post._id} className='divide-y'>
                <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700 '>
                  <TableCell>
                    <img src={post.image} alt={post.title} className='w-14 h-10 rounded-md object-cover bg-gray-500'/>
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`} className='line-clamp-1'>{post.title}</Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2'>
          <div className='flex justify-between font-semibold items-center text-sm p-3'>
            <h1>Recent Comments</h1>
            <Button className='cursor-pointer outline-2 outline-pink-400 hover:bg-gradient-to-r from-purple-500 to-pink-500'>
              <a href="/dashboard?tab=comments">See All</a>
            </Button>
          </div>
          <Table hoverable={true} className='text-sm'>
            <TableHead>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Likes</TableHeadCell>
            </TableHead>
            {comments.map((comment) => (
              <TableBody key={comment._id} className='divide-y'>
                <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700 '>
                  <TableCell className='line-clamp-2'>
                    {comment.comment}
                  </TableCell>
                  <TableCell>
                    {comment.numberOfLikes} Likes
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  )
}

export default DashboardComp