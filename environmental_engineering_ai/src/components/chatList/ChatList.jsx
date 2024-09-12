import "./ChatList.css";
import { Link } from "react-router-dom"

const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">New chat</Link>
      <Link to="/">Explore Apollo</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">CHATS</span>
      <div className="list">
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/Logo2.png" alt="Logo" />
        <div className="texts">
        </div>
      </div>
    </div>
  )
}

export default ChatList
