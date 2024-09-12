import "./ChatPage.jsx"
import { useRef } from "react";

const ChatPage = () => {
  const endref = useRef(null)
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message from AI</div>
          <div className="message user">
            Test message from USER aésldaédlasédlasádéassdáaldáasédlasápdlasáédqwpdláwdpqklwpdlqwekqpeqáwpeqőwelqwőepqwáepqwrpqkrqpwrkqpwfkkgorjgeojgdskjgkskhgdksdhgskdsdfsdgfdhfgjtzututzj
          </div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Test message from USER</div>
          <div ref={endref} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
