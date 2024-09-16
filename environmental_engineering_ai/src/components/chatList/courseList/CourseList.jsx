import { Link } from "react-router-dom"
import "./CourseList.css"

const CourseList = () => {
  return (
    <div className="courseList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">About</Link>
      <Link to="/dashboard">Try with AI</Link>
      <Link to="/">Explore Apollo</Link>
      <hr />
      <span className="title">Topics</span>
      <div className="list">
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
        <Link to="/">Course title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo3.png" alt="" />
        <div className="text"> 
        </div>
      </div>
    </div>
  )
}

export default CourseList