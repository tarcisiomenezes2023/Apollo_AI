"use client";

import { useState, useEffect } from "react";
import { Socket } from "../../../Socket";

interface NewPromptProps {
  id: string;
}

const NewPrompt: React.FC<NewPromptProps> = ({ id }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isLoading) return; /* veryfing if the message is empty */

    setIsLoading(true);

    try {
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
      
      /* emit a new message through socket.io */
      Socket.emit("newMessage", { user: message, ai: data.text, chatId: id });

      setMessage(""); /* clean the input */
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /* join chat */
    Socket.emit("joinChat", id);

    return () => {
      /* clean the event when the component is destroyed */
      Socket.off("newMessage");
    };
  }, [id]);

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
          disabled={isLoading || !message.trim()} /* Deactive the button when the message is not loaded */
          className={`bg-[#605e68] rounded-3xl border-none cursor-pointer p-2.5 flex items-center justify-center mr-5 ${
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
                     