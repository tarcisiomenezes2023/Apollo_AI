'use client';

import NewPrompt from '@/app/components/newPrompt/page';
import { useParams } from 'next/navigation'; // Importando o hook useParams para capturar o id
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'

const ChatPage = () => {
  const { id } = useParams(); // Obtendo o id da URL
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]); /* Type of state */
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`http://localhost:5000/chats/${id}`); // URL correta
        if (!response.ok) {
          throw new Error('Network response is not ok')
        }
        const data = await response.json()
        setChatHistory(data.history)

      } catch (error) {
        console.error('Error fetching chat history:', error);
        setError('Failed to load chat history.')
      } finally {
        setLoading(false)
      }
    };

    if (id) {
      fetchChatHistory();
    }
  }, [id]);

  return (
    <div className='h-full flex flex-col items-center relative'>
      <div className="flex-1 overflow-scroll w-full flex justify-center">
        <div className="3/5 flex flex-col gap-5 ">
        {loading && <p>Loading chat history...</p>}
        {error && <p className='text-red-500'>{error}</p>}
          {chatHistory.map((msg, index) => (
            <div key={index} className="">
              <div className='bg-[#373A40] rounded-lg max-w-4/5 self-end p-2'>
                <ReactMarkdown>{msg.user}</ReactMarkdown>
              </div> {/* Showing the message from user */}
              <div className='AI bg-[#373A40] rounded-lg p-1'>
                <strong>Apollo:</strong><ReactMarkdown>{msg.ai}</ReactMarkdown>
              </div> {/* Showing the AI answer */}
            </div>
          ))}
        <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;