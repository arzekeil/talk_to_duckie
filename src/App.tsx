import React, { useState } from "react";
import AppBar from "./components/AppBar";
import MessageWidget from "./widgets/MessageWidget";
import AudioRecorder from "./components/AudioRecorder";
import Message from "./types/Message";

const App: React.FC = () => {
  // State to store all messages
  const [messages, setMessages] = useState<Message[]>([
    Message.createRecipientMessage(1, "Hello, how can I help you?"),
  ]);

  // Function to handle adding a new message
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 flex flex-col">
      {/* AppBar */}
      <AppBar />

      {/* Main Content */}
      <main
        className="flex-grow flex items-center justify-center pt-2 pb-2"
        style={{ height: "calc(100vh - 4rem)" }} // Adjust 4rem to match AppBar height if necessary
      >
        <div className="bg-white shadow-lg rounded-xl w-full max-w-lg flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <MessageWidget key={message.id} message={message} />
            ))}
          </div>

          {/* Audio Recorder */}
          <div className="bg-gray-100 border-t border-gray-300 p-4 rounded-b-xl">
            <AudioRecorder
              onSend={({ audioUrl, text }) =>
                addMessage(new Message(Date.now(), "user", text || "Audio message sent", audioUrl))
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
