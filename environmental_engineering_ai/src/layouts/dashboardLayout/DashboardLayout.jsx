import "./DashboardLayout.css"
import { Outlet } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"


const DashboardLayout = () => {

    const {userId, isLoaded} = useAuth()
    return (
        <div className="dashboardLayout">
            <div className="menu">MENU</div>
            <div className="content">
                <Outlet />
            </div>
        </div>
  )
}

export default DashboardLayout