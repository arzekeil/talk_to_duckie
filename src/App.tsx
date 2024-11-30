import React, { useState } from "react";
import AppBar from "./components/AppBar";
import MessageWidget from "./widgets/MessageWidget";
import AudioRecorder from "./components/AudioRecorder";
import Message from "./types/Message";

const App: React.FC = () => {
  // State to store user messages and recipient (AI) messages
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [recipientMessages, setRecipientMessages] = useState<Message[]>([]);

  // Function to handle adding a user message
  const addUserMessage = (message: Message) => {
    setUserMessages((prevMessages) => [...prevMessages, message]);

    // Simulate an AI response based on the user message
    getAIResponse(message.text || ""); // Pass the user message text to the AI model
  };

  // Function to handle adding a recipient (AI) message
  const addRecipientMessage = (message: Message) => {
    setRecipientMessages((prevMessages) => [...prevMessages, message]);
  };

  // Mock function to simulate an API call to the AI model
  const getAIResponse = async (userText: string) => {
    try {
      // Simulate an API call
      const response = await fetch("http://localhost:5000/parse_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userText }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();

      // console.log(data.response)

      const aiMessage = new Message(
        Date.now(),
        "recipient",
        data.response || "I didn't understand that."
      );
      addRecipientMessage(aiMessage);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  // Combine user and recipient messages for rendering in the chat UI
  const allMessages = [...userMessages, ...recipientMessages].sort(
    (a, b) => a.id - b.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 flex flex-col">
      {/* AppBar */}
      <AppBar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-lg flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {allMessages.map((message) => (
              <MessageWidget key={message.id} message={message} />
            ))}
          </div>

          {/* Audio Recorder */}
          <div className="bg-gray-100 border-t border-gray-300 p-4 rounded-b-xl mb-4">
            <AudioRecorder
              onSend={({ audioUrl, text }) =>
                addUserMessage(new Message(Date.now(), "user", text || "Audio message sent", audioUrl))
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
