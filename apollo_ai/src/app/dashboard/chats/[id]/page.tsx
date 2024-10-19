"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import NewPrompt from "../../../components/newPrompt/page";

const ChatPage = () => {
  const { id } = useParams();
  const chatId = Array.isArray(id) ? id[0] : id; // Ensure chatId is a string
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Reference for the messages end

  useEffect(() => {
    if (!chatId) return;

    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/chats/${chatId}`);
        if (!res.ok) throw new Error('Failed to load chat history');
        const data = await res.json();
        setChatHistory(data.messages);
      } catch (error) {
        console.error('Erro ao buscar histórico de mensagens:', error);
        setError('Failed to load chat history.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [chatId]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]); // Runs every time chatHistory changes

  const handleNewMessage = async (newMessage: { user: string; ai: string }) => {
    try {
      const res = await fetch(`http://localhost:5000/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId, text: newMessage.user }),
      });

      if (!res.ok) throw new Error('Error sending message');
      const updatedChat = await res.json();

      // Atualiza o histórico de mensagens na página
      setChatHistory(prev => [...prev, newMessage]);
    } catch (error) {
      console.error("Erro ao enviar nova mensagem:", error);
      setError("Error sending message.");
    }
  };

  return (
    <div className="h-full flex flex-col items-center relative" style={{backgroundColor: 'rgb(13, 0, 23)'}}>
      <div className="flex-1 overflow-auto w-full flex justify-center">
        <div className="w-5/5 md:w-3/5 flex flex-col gap-5 p-4">
          {loading && <p>Loading chat history...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {chatHistory.map((msg, index) => (
            <div key={index} className="flex flex-col gap-2.5">
              <div className="flex justify-end">
                <div className="bg-[#373A40] rounded-lg max-w-4/5 self-end p-2">
                  <ReactMarkdown>{msg.user}</ReactMarkdown>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="AI bg-[#064e3b] rounded-lg p-1">
                  <strong>Apollo:</strong>
                  <ReactMarkdown>{msg.ai}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {/* Reference to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <NewPrompt onNewMessage={handleNewMessage} id={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;