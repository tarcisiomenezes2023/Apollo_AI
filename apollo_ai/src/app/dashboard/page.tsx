"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database"; // Importando o Firebase

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Error sending message");
      }

      const data = await res.json();
      const newChatId = data.chatId;

      // Salvando o novo chat no Firebase
      const db = getDatabase();
      const chatRef = ref(db, `chats/${newChatId}/messages`);
      await set(chatRef, []); // Inicializa com um array vazio

      router.push(`dashboard/chats/${newChatId}`);
    } catch (error: any) {
      console.error("Error: " + error);
      setError(error.message || "Unknown error!");
    }
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center w-2.5/5 gap-12">
        <div className="flex items-center gap-5 opacity-20">
          <img src="/logo3.png" alt="logo" className="w-16 h-16" />
          <h1 className="text-6xl bg-gradient-to-r from-[#33ff28] to-[#e55571] bg-clip-text text-transparent font-bold">
            Apollo
          </h1>
        </div>
        <div className="w-full flex items-center justify-between gap-12">
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border-2 border-[#555] rounded-2xl">
            <img src="/chat.png" alt="Chat Icon" className="w-10 h-10 object-cover" />
            <span>Create a New Chat</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border-2 border-[#555] rounded-2xl">
            <img src="/image.png" alt="Image Icon" className="w-10 h-10 object-cover" />
            <span>Analyze Images</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border-2 border-[#555] rounded-2xl">
            <img src="/code.jpg" alt="Code icon" className="w-10 h-10 object-cover" />
            <span>Analyze Code</span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-2.5/5 bg-[#2c2937] rounded-5 flex">
        <form onSubmit={handleSubmit} className='w-full h-full flex items-center justify-between gap-5 mb-2.5'>
          <input
            type="text"
            name='text'
            placeholder='ask anything...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1 p-5 bg-transparent border-none outline-none color-[#ececec]' />
          <button
            type='submit'
            className='bg-[#605e68] rounded-2.5/5 border-none cursor-pointer p-2.5 flex items-center justify-center mr-5 rounded-3xl'>
            <img src="/arrow.png" alt="send icon" className='w-5 h-5' />
          </button>
        </form>
        {error && (
          <div className='text-red-500 mt-5'>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}