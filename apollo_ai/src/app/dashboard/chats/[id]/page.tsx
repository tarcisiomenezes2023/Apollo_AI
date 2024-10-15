// src/app/components/chatPage/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../config/FirebaseConfig'; // Importa o db corretamente
import { ref, onValue } from 'firebase/database'; // Funções do Realtime Database
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const ChatPage = () => {
  const { id } = useParams();
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const chatRef = ref(db, `chats/${id}`); // Usando o db corretamente

    const unsubscribe = onValue(
      chatRef,
      (snapshot) => {
        const data = snapshot.val()?.messages; // Acessando as mensagens corretamente
        if (data) {
          const messagesArray = Object.values(data) as { user: string; ai: string }[]; // Convertendo as mensagens
          setChatHistory(messagesArray);
        }
        setLoading(false);
      },
      (errorObject) => {
        console.error('Erro ao buscar histórico de mensagens:', errorObject);
        setError('Failed to load chat history.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  return (
    <div className="h-full flex flex-col items-center relative">
      <div className="flex-1 overflow-scroll w-full flex justify-center">
        <div className="w-3/5 flex flex-col gap-5 p-4">
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
        </div>
      </div>
    </div>
  );
};

export default ChatPage;