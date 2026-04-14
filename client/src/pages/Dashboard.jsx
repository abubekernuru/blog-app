import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashProfile from "../components/DashProfile"
import DashSidebar from "../components/DashSidebar"
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"

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
      {/*Profile  */}
      {tab === "profile" && <DashProfile />}
      {/*Posts  */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
    </div>
  )
}

export default Dashboard