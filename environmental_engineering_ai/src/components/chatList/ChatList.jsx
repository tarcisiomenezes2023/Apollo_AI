import "./ChatList.css";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "@clerk/clerk-react";

const ChatList = () => {

  const { userId } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () => 
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: 'include',
      }).then((res) => res.json()),
      enabled: !!userId,
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">New chat</Link>
      <Link to="/">Explore Apollo</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">CHATS</span>
      <div className="list">
        {isPending ? "Loading..." : error ? "Something went wrong!" : (
          data?.map(chat => (
            <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
              {chat.title}
            </Link>
          ))
        )}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo3.png" alt="Logo" />
        <div className="texts">
        </div>
      </div>
    </div>
  );
}

export default ChatList;