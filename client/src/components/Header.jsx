import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Button,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider
} from 'flowbite-react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/themeSlice'
import { useEffect } from 'react'
import { signoutSuccess } from '../redux/userSlice'

const apiUrl = import.meta.env.VITE_API_URL;

function Header() {
  const location = useLocation()
  const { currentUser }= useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { theme }= useSelector((state) => state.theme)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();


useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [theme]);

const handleSignout = async ()=>{
  try {
    const res = await fetch(`${apiUrl}/api/user/signout`, {
      method: 'POST',
    })
    const data = await res.json();
    dispatch(signoutSuccess());
  } catch (error) {
    console.log('Error signing out. Please try again.', error);
  }
}

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl =urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
    
  },[location.search])

  const handleSubmit = (e)=>{
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams();
      if (searchTerm) {
        urlParams.set('searchTerm', searchTerm);
      }
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
<Navbar className='border-b-2'>
  <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'>
    <span className='px-2 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg'>
      Abuki's
    </span>
    Blog
  </Link>

  <form onSubmit={handleSubmit}>
    <TextInput
      type='text'
      placeholder='Search...'
      rightIcon={AiOutlineSearch}
      className='hidden lg:inline'
      onChange={(e)=>setSearchTerm(e.target.value)}
      value={searchTerm}
    />
  </form>

  <Button className='w-12 h-10 lg:hidden' color='gray' pill onClick={handleSubmit}>
    <AiOutlineSearch />
  </Button>

  <div className='flex gap-2 md:order-2'>
  <Button
    className='w-12 h-10 hidden sm:inline cursor-pointer'
    color='gray'
    pill
    onClick={() => dispatch(toggleTheme())}
  >
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
  </Button>
    {currentUser ? (
      <Dropdown
      inline
      arrowIcon={false}
      label={
        <Avatar alt='user' img={currentUser.avatar} rounded className='cursor-pointer' />
      }
      >
        <DropdownHeader>
          <span className='block text-sm mb-2'>{currentUser.username}</span>
          <span className='block truncate text-sm font-medium'>{currentUser.email}</span>
        </DropdownHeader>
        <Link to={'/dashboard?tab=profile'}>
        <DropdownItem>
          Profile
        </DropdownItem>
        </Link>
        <DropdownDivider />
        <Link to={'/'} onClick={handleSignout}>
        <DropdownItem>
          Sign out
        </DropdownItem>
        </Link>
      </Dropdown>
    ) : (
      <Link to={'/signin'}>
        <Button color="pink" outline className='cursor-pointer'>
          Sign In
        </Button>
      </Link>
    )}

    <NavbarToggle />
  </div>

  <NavbarCollapse>
    <NavbarLink active={location.pathname === '/'} as={'div'} className='text-gray-800'>
      <Link to={'/'}>Home</Link>
    </NavbarLink>
    <NavbarLink active={location.pathname === '/about'} as={'div'} className='text-gray-800'>
      <Link to={'/about'}>About</Link>
    </NavbarLink>
    <NavbarLink active={location.pathname === '/projects'} as={'div'} className='text-gray-800'>
      <Link to={'/projects'}>Projects</Link>
    </NavbarLink>
  </NavbarCollapse>
</Navbar>
  )
}

export default Header