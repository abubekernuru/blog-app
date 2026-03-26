import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Button,
} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

function Header() {
  return (
<Navbar className='border-b-2'>
  <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'>
    <span className='px-2 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg'>
      Abuki's
    </span>
    Blog
  </Link>

  <form>
    <TextInput
      type='text'
      placeholder='Search...'
      rightIcon={AiOutlineSearch}
      className='hidden lg:inline'
    />
  </form>

  <Button className='w-12 h-10 lg:hidden' color='gray' pill>
    <AiOutlineSearch />
  </Button>

  <div className='flex gap-2 md:order-2'>
    <Button className='w-12 h-10' color='gray' pill>
      <FaMoon />
    </Button>

    <Link to={'/signin'}>
      <Button color="purple">
        Sign In
      </Button>
    </Link>

    <NavbarToggle />
  </div>

  <NavbarCollapse>
    <NavbarLink as={'div'}>
      <Link to={'/'}>Home</Link>
    </NavbarLink>
    <NavbarLink as={'div'}>
      <Link to={'/about'}>About</Link>
    </NavbarLink>
    <NavbarLink as={'div'}>
      <Link to={'/projects'}>Projects</Link>
    </NavbarLink>
  </NavbarCollapse>
</Navbar>
  )
}

export default Header