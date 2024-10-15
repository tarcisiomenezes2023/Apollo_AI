"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue, push } from "firebase/database"; // Importando push para adicionar novas mensagens
import { db } from '../../../config/FirebaseConfig'; // Usando db ao invés de database
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import NewPrompt from "../../../components/newPrompt/page"; // Importando o NewPrompt

const ChatPage = () => {
  const { id } = useParams();
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const chatRef = ref(db, `chats/${id}/messages`); // Referência correta para o caminho dos chats

    const unsubscribe = onValue(
      chatRef,
      (snapshot) => {
        const data = snapshot.val();
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

  const handleNewMessage = async (newMessage: { user: string; ai: string }) => {
    const chatRef = ref(db, `chats/${id}/messages`);
    await push(chatRef, newMessage); // Salvando a nova mensagem no Firebase
  };

  return (
    <div className="h-full flex flex-col items-center relative">
      <div className="flex-1 overflow-auto w-full flex justify-center"> {/* Alterado para overflow-auto */}
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
      <div className="w-full flex justify-center"> {/* Mantém o NewPrompt no final */}
        <NewPrompt onNewMessage={handleNewMessage} />
      </div>
    </div>
  );
};

export default ChatPage;