import "./DashboardLayout.css"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <div className="dashboardLayout">
            <div className="menu"></div>
            <div className="content">
                <Outlet />
            </div>
        </div>
  )
}

export default DashboardLayout
