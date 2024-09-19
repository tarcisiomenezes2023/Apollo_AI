import { useEffect, useRef, useState } from "react";
import "./NewPrompt.css";
import Upload from "../../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../../lib/gemini";
import Markdown from "react-markdown";
import { saveMessage, fetchMessages } from "../../../Firebase/Utilities/FireBaseUtilities";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]); // Para armazenar o histórico de mensagens

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  // Função para carregar histórico do Firebase
  useEffect(() => {
    const loadMessages = async () => {
      const loadedMessages = await fetchMessages('user123'); // Troque para o ID de usuário real
      setMessages(loadedMessages);
    };
    loadMessages();
  }, []);

  const add = async (text) => {
    setQuestion(text);

    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    );
    let accumulatedText = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText; 
      setAnswer(accumulatedText);
    }

    // Salvar a mensagem e a resposta no Firebase
    await saveMessage('user123', { question: text, answer: accumulatedText }); // Troque o ID de usuário

    setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text);
  };

  return (
    <>  
      {/* Exibir histórico de mensagens */}
      {messages.map((msg, index) => (
        <div key={index}>
          <div className="message user">{msg.question}</div>
          <div className="message"><Markdown>{msg.answer}</Markdown></div>
        </div>
      ))}

      {/* Novo chat */}
      {img.isLoading && <div className="">Loading...</div>}

      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380" 
          transformation={[{ width: 380 }]} 
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && <div className="message"><Markdown>{answer}</Markdown></div>}
      <div className="endChat" ref={endRef}></div>
      <div className="newPrompt" onSubmit={handleSubmit}>
        <form className="newForm">
          <Upload setImg={setImg}/>
          <input id="file" type="file" multiple={false} hidden />
          <input type="text" name="text" placeholder="Ask anything..." />
          <button type="submit">
            <img src="/arrow.png" alt="send icon" />
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;
