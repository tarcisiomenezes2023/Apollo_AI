"use client";

import { useState } from "react";

interface NewPromptProps {
  onNewMessage: (newMessage: { user: string, ai: string }) => void;
}

const NewPrompt: React.FC<NewPromptProps> = ({ onNewMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }), // Mudança aqui para 'text'
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      const newMessage = { user: message, ai: data.text }; // Ajuste aqui para usar data.text
      onNewMessage(newMessage);

      setMessage(""); // Limpa o campo de entrada
    } catch (error) {
      console.error(`Failed to fetch chat`, error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-3/5 absolute bottom-0 bg-[#2c2937] rounded-3xl flex items-center gap-5 p-0.5"
      >
        <input
          type="text"
          name="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"
        />
        <button
          type="submit"
          className="rounded-3xl bg-[#605e68] border-none p-2.5 flex items-center justify-center cursor-pointer"
        >
          <img src="/arrow.png" alt="send icon" className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;