"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newChatId = Date.now().toString(); /* generate unique id */

    try {
      console.log(`Enviando mensagem: ${message}`);

      const res = await fetch(`http://localhost:5000/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId: newChatId, text: message }), /* chatId incuded here */
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error sending message");
      }

      const data = await res.json();
      console.log("Resposta do backend:", data);

      /* Redirect to dashboard/chats/ with the new ID */
      router.push(`dashboard/chats/${newChatId}`);
    } catch (error: any) {
      console.error("Error: " + error);
      setError(error.message || "Unknown error!");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex-1 flex flex-col items-center w-2.5/5 gap-12">
        <div className="flex items-center gap-5 opacity-20">
          <img src="/logo3.png" alt="logo" className="w-8 h-8 md:w-16 md:h-16" />
          <h1 className="text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#33ff28] to-[#e55571] bg-clip-text text-transparent font-bold">
            Apollo
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-2.5 font-light text-sm p-0 sm:p-5 border-2 border-[#555] rounded-2xl">
            <img src="/chat.png" alt="Chat Icon" className="w-10 h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 object-cover" />
            <span>Create a New Chat</span>
          </div>
          <div className="flex flex-col items-center gap-2.5 font-light text-sm p-0 sm:p-5 border-2 border-[#555] rounded-2xl">
            <img src="/image.png" alt="Image Icon" className="w-10 h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 object-cover" />
            <span>Analyze Images</span>
          </div>
          <div className="flex flex-col items-center gap-2.5 font-light text-sm p-0 sm:p-5 border-2 border-[#555] rounded-2xl">
            <img src="/code.jpg" alt="Code icon" className="w-10 h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 object-cover" />
            <span>Analyze Code</span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-5/5 sm:w-4/5 md:w-3/5 bg-[#2c2937] rounded-xl flex">
        <form onSubmit={handleSubmit} className='w-full bg-[#2c2937] rounded-3xl flex items-center gap-5 p-0.5'>
          <input
            type="text"
            name='text'
            placeholder='ask anything...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]' />
          <button
            type='submit'
            className='bg-[#605e68] rounded-3xl border-none cursor-pointer p-2.5 flex items-center justify-center'>
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