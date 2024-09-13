import { useEffect, useRef } from "react";
import "./NewPrompt.css";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ADD NEW CHAT */}
      <div className="endChat" ref={endRef}></div>
      <div className="newPrompt">
        <form className="newForm">
          <label htmlFor="file">
            <img src="/attachment.png" alt="attachment icon" />
          </label>
          <input id="file" type="file" multiple={false} hidden />
          <input type="text" placeholder="Ask anything..." />
          <button type="submit">
            <img src="/arrow.png" alt="send icon" />
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;

