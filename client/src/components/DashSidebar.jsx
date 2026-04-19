import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiOutlineArrowSmRight, HiChartPie } from "react-icons/hi"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/userSlice.js';
import { useSelector } from 'react-redux'

function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch();
  const [tab, setTab] = useState("")
  const {currentUser} = useSelector((state) => state.user);
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
        <SidebarItemGroup className='flex flex-col gap-1'>
          {currentUser.isAdmin && 
          (
            <Link to={"/dashboard?tab=dashboard"}>
              <SidebarItem active={tab === "dashboard" || !tab} icon={HiChartPie}  labelColor='dark' as={'div'}>
                Dashboard
              </SidebarItem>
            </Link>
          )}
          <Link to={"/dashboard?tab=profile"}>
            <SidebarItem active={tab === "profile"} icon={HiUser} label={currentUser.isAdmin ? "Admin" : "User"} labelColor='dark' as={'div'}>
              Profile
            </SidebarItem>
          </Link>
          {currentUser.isAdmin && 
          (
          <>
            <Link to={"/dashboard?tab=posts"}>
              <SidebarItem active={tab === "posts"} icon={HiDocumentText}  labelColor='dark' as={'div'}>
                Posts
              </SidebarItem>
            </Link>
            <Link to={"/dashboard?tab=users"}>
              <SidebarItem active={tab === "users"} icon={HiOutlineUserGroup}  labelColor='dark' as={'div'}>
                Users
              </SidebarItem>
            </Link>
            <Link to={"/dashboard?tab=comments"}>
              <SidebarItem active={tab === "comments"} icon={HiAnnotation}  labelColor='dark' as={'div'}>
                Comments
              </SidebarItem>
            </Link>
          </>
          )}
          <SidebarItem  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>

    </Sidebar>
  )
}

export default DashSidebar