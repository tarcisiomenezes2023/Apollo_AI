import "./Homepage.css"
import { Link } from "react-router-dom"
import { TypeAnimation } from 'react-type-animation';

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/background2.jpg" alt="background homepage" className="backgroundHomepage one" />
      <img src="/background2.jpg" alt="background homepage" className="backgroundHomepage two" />
      <img src="/background2.jpg" alt="background homepage" className="backgroundHomepage three" />
      <img src="/background2.jpg" alt="background homepage" className="backgroundHomepage four" />
      <img src="/background2.jpg" alt="background homepage" className="backgroundHomepage five" />
      <div className="left">
        <h1>Apollo</h1>
        <h2>Your AI Environmental Engineer!</h2>
        <h3>Making the world a greener place, one solution at a time.</h3>
        <Link to="/courses">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/Apollo2.png" alt="Hero" className="apollo" />
          <div className="chat">
            <img src="/Apollo2.png" alt="Hero chat" />
          <TypeAnimation className="text" sequence={[
            ': Innovative solutions for a sustainable future.',
            2000, 
            ': Empowering students with cutting-edge solutions for a sustainable tomorrow.',
            2000,
            ': Transforming data into actionable environmental insights.',
            2000,
            ': Harnessing technology to protect our planet.',
            2000 ]}
            wrapper="span"
            speed={60}
            style={{ fontSize: '14px', display: 'inline-block',
            maxWidth: "500px" }}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="dev">
        <a href="https://tarcisiomenezes.netlify.app" target="blank"><img src="/websiteIcon.png" alt="webIcon" /></a>
        <span>By Tarcísio Menezes</span>
      </div>
    </div>
  )
}

export default Homepage
