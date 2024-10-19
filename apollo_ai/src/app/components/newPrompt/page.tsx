"use client";

import { useState } from "react";

interface NewPromptProps {
  onNewMessage: (newMessage: { user: string; ai: string }) => void;
  id: string;
}

const NewPrompt: React.FC<NewPromptProps> = ({ onNewMessage, id }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return; // Evita enviar mensagens vazias
    if (isLoading) return; // Evita múltiplos envios

    setIsLoading(true);

    try {
      // Cria um objeto para a nova mensagem
      const newMessage = { user: message, ai: "" }; // Placeholder para AI

      // Chama a função de adicionar nova mensagem
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message, chatId: id }),
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      const data = await res.json();
      // Adiciona a nova mensagem com resposta da AI
      onNewMessage({ user: message, ai: data.text });

      setMessage(""); // Limpa o input
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-5 w-5/5 sm:w-3/5">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2c2937] rounded-3xl flex items-center gap-5 p-0.5"
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
          disabled={isLoading || !message.trim()}
          className={`bg-[#605e68] rounded-2.5/5 border-none cursor-pointer p-2.5 flex items-center justify-center mr-5 rounded-3xl ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <img src="/arrow.png" alt="send icon" className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;