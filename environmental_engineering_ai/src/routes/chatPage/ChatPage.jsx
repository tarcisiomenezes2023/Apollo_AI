import { useQuery } from "@tanstack/react-query";
import NewPrompt from "../../components/chatList/newPrompt/NewPrompt.jsx";
import "./ChatPage.css";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split('/').pop();

  const { isLoading, error, data } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isLoading ? "Loading..." : error ? "Something went wrong!" : 
          data?.history?.map((message, i) => (
            <div key={i}>
              {message.img && (
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={message.img}
                  height={300}
                  width={300}
                  transformation={[{ height: 300, width: 400 }]}
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                />
              )}
              <div className={message.role === "user" ? "message user" : "message"}>
                <Markdown>{message.parts[0].text}</Markdown>
              </div>
            </div>
          ))}
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;