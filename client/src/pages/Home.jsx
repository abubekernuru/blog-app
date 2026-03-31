import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='pt-6 dark:text-white dark:bg-gray-800 min-h-screen'>
      {currentUser ? <h1>Welcome, {currentUser.username}!</h1> : <h1>Welcome to our Blog App!</h1>}
    </div>
  )
}

export default Home