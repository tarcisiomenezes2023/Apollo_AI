import { Outlet } from "react-router-dom"
import "./Mate_layout.css"
import CourseList from "../../components/chatList/courseList/CourseList"


const Mate_layout = () => {
  return (
    <div className="mate_layout">
      <div className="menu"> <CourseList /> </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Mate_layout