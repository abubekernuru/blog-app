import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashProfile from "../components/DashProfile"
import DashSidebar from "../components/DashSidebar"
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"
import DashComments from "../components/DashComments"
import DashboardComp from "../components/DashboardComp"

function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState("")
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    // console.log(tabFromUrl)
  },[location.search])
  return (
    <div className="flex flex-col md:flex-row  min-h-screen dark:bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/*Dashboard  */}
      {tab === "dashboard" && <DashboardComp />}
      {/*Profile  */}
      {tab === "profile" && <DashProfile />}
      {/*Posts  */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
    </div>
  )
}

export default Dashboard