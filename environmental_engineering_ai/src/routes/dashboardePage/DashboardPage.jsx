import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./DashboardPage.css";
import { useAuth } from '@clerk/clerk-react';

const DashboardPage = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize useNavigate

  // Mutation for creating a new chat
  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, userId }), // Include userId in the request body
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      // Invalidate queries to refetch the updated chats
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      // Navigate to the new chat's page using the returned id
      navigate(`/dashboard/chats/${data.id}`);
    },
    onError: (error) => {
      console.error("Error creating chat:", error);
    }
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    // Trigger mutation
    mutation.mutate(text);
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo3.png" alt="logo" />
          <h1>Apollo</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Chat icon" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Image icon" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.jpg" alt="Code icon" />
            <span>Analyze and Debugging Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask anything..." />
          <button type="submit">
            <img src="/arrow.png" alt="Submit arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;