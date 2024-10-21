"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import "./chatList.css";

const ChatList = () => {
  const [chatList, setChatList] = useState<{ id: string; title: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
     /* function to fetch list of chats from the backend */
    const fetchChats = async () => {
      try {
        const res = await fetch("http://localhost:5000/chats");
        if (!res.ok) throw new Error("Erro ao buscar chats");
    
        const data = await res.json();
        if (data && data.chats) {
          const chatsArray = Object.keys(data.chats).map(id => ({ id, title: `${id}` }));
          setChatList(chatsArray);
        }
      } catch (error) {
        console.error("Erro ao buscar a lista de chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className='container flex flex-col h-full'>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 mb-4 rounded-3xl bg-gray-700 text-white flex items-center justify-center"
        style={{ width: 'fit-content' }} // Adjust width to fit content
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>  /* Icon X */
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>  /* Hamburguer icon */
        )}
      </button>
      {isOpen && (
        <div className="flex flex-col h-full">
          <span className='text-xl font-bold mb-4'>DASHBOARD</span>
          <Link href="/dashboard" className='p-2.5 rounded-md text-green-500'>
            New Chat
          </Link>
          <Link href="/" className='p-2.5'>Explore Apollo</Link>
          <Link href="/" className='p-2.5'>Create your dashboard</Link>
          <hr className='border-none h-0.5 bg-[#ffffff] opacity-10 rounded-md my-5' />
          <span className='font-semibold text-lg mb-2.5'>CHATS</span>
          <div className="flex flex-col overflow-auto">
            {chatList.map((chat) => (
              <Link key={chat.id} href={`/dashboard/chats/${chat.id}`} className='p-2.5'>
                {chat.title}
              </Link>
            ))}
          </div>
          <hr className="my-5" />
          <div className="mt-auto flex items-center gap-3">
            <img src="/logo3.png" alt="Logo" className='w-7 h-7' />
            <div className="flex flex-col">
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;