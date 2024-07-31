import "./Homepage.css"
import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/background2.jpg" alt="background homepage" className="backgroundHomepage" />
      <div className="left">
        <h1>Apollo</h1>
        <h2>Your AI Environmental Engineer!</h2>
        <h3>Making the world a greener place, one solution at a time.</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/Apollo2.png" alt="Hero" className="apollo" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
