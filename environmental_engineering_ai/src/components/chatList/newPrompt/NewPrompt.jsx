import { useEffect, useRef, useState } from "react";
import "./NewPrompt.css";
import Upload from "../../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      // Reset img state after successful AI response
      setImg({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
      });
    } catch (error) {
      console.error("Error occurred during AI response:", error);
      setImg((prevState) => ({
        ...prevState,
        error: "Your request couldn't be processed due to safety reasons.",
      }));
      setAnswer("Sorry, your request couldn't be processed due to safety reasons.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    setImg((prevState) => ({ ...prevState, isLoading: true }));
    add(text);

  };

  return (
    <>  
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}

      {img.error && <div className="error">{img.error}</div>}

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
          <Upload setImg={setImg} />
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
