import { useEffect, useRef } from "react"
import "./ChatPage.jsx"

const ChatPage = () => {

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []); 

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message from AI</div>
          <div className="messageUser">
            Test message from user Lorem ipsum dolor sit amet lorem ipisum dolor sit amet lorem ipsum dolar lorem ipsum
            sdkaoskdfa oaskdoakd apodk aspodka dp aoskdkpa apsodkasod ksdokakosdka kaskdosakdoakd asodk sodaso as asodkasokd
            asjdojd odasok doa kdoskd aő psk asodwqk sp dkaősd kakskd őapsod aksd paskda pakpdkaőspd akapskdakd opa aoskdoak
            éassdoasskd paoskdaossd őpaskdaőpdkaőpdaőspd a lorem ipsum dolor sit amet dfjsdfj sőaspf lorem ipsum dolor sit amet
          </div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div className="message">Test message from ai</div>
          <div className="messageUser">Test message from user</div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
