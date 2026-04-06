import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from "react-icons/hi"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/userSlice.js';


function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch();
  const [tab, setTab] = useState("")
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    // console.log(tabFromUrl)
  },[location.search])

    const handleSignout = async ()=>{
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        })
        const data = await res.json();
        dispatch(signoutSuccess());
        alert(data);
      } catch (error) {
        console.log('Error signing out. Please try again.', error);
      }
    }
  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <SidebarItem active={tab === "profile"} icon={HiUser} label={"User"} labelColor='dark' as={'div'}>
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>

    </Sidebar>
  )
}

export default DashSidebar