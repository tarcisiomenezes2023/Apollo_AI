'use client';

import { useParams } from 'next/navigation'; // Importando o hook useParams para capturar o id
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
  const { id } = useParams(); // Obtendo o id da URL
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]); /* Type of state */

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/chats/${id}`); // URL correta
        const data = await response.json();
        setChatHistory(data.history);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (id) {
      fetchChatHistory();
    }
  }, [id]);

  return (
    <div className='h-full flex flex-col items-center relative'>
      <div className="flex-1 overflow-scroll w-full flex justify-center">
        <div className="w-2.5/5 flex flex-col gap-5">
          {chatHistory.map((msg, index) => (
            <div key={index} className="bg-[#2c2937] p-4 rounded-lg text-[#ececec]">
              <div><strong>User:</strong> {msg.user}</div> {/* Showing the message from user */}
              <div><strong>AI:</strong> {msg.ai}</div> {/* Showing the AI answer */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;