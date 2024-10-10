"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewPrompt = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (!res.ok) {
        // Capturando respostas de erro do servidor
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao enviar mensagem');
      }

      const data = await res.json();
      const newChatId = data.chatId;

      router.push(`/dashboard/chats/${newChatId}`);
    } catch (error: any) {
      console.error('Error: ', error);
      setError(error.message || 'Erro desconhecido');
    }
  };

  return (
    <>
      <div className='pb-24'></div>
      <div className="newPrompt">
        <form onSubmit={handleSubmit} 
          className='w-2.5/5 bg-[#2c2937] rounded-3xl flex items-center gap-5 p-0.5'>
            <input
              type="text"
              name='text'
              placeholder='Ask anything...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]'
            />
            <button type='submit'
              className='rounded-3xl bg-[#605e68] border-none p-2.5 flex items-center justify-center cursor-pointer'>
              <img src="/arrow.png" alt="send icon" className='w-5 h-5' />
            </button>
        </form>
        {error && (
          <div className='text-red-500 mt-5'>
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default NewPrompt;
