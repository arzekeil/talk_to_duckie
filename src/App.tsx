import React, { useState } from "react";
import AppBar from "./components/AppBar";
import MessageWidget from "./widgets/MessageWidget";
import AudioRecorder from "./components/AudioRecorder";
import Message from "./types/Message";
import CodeEditor from "./components/CodeEditor";

const BASE_URL = "http://localhost:5000";

const App: React.FC = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [recipientMessages, setRecipientMessages] = useState<Message[]>([]);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addUserMessage = (message: Message) => {
    setUserMessages((prevMessages) => [...prevMessages, message]);
    getAIResponse(message.text || "");
  };

  const addRecipientMessage = (message: Message) => {
    setRecipientMessages((prevMessages) => [...prevMessages, message]);
  };

  const sortMessages = () => {
    return [...userMessages, ...recipientMessages].sort((a, b) => a.id - b.id);
  };

  const getAIResponse = async (userText: string) => {
    setLoading(true);
    setErrorMessage(null); // Clear any existing errors
    try {
      const response = await fetch(`${BASE_URL}/parse_response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userText }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();

      for (let i = 0; i < data.response.length; i++) {
        const aiMessage = new Message(
          Date.now(),
          "recipient",
          data.response[i] || "I didn't understand that."
        );
        addRecipientMessage(aiMessage);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      setErrorMessage("Error fetching AI response. Please try again later.");
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const startSession = async () => {
    setStart(true);
    setLoading(true);
    setErrorMessage(null); // Clear any existing errors
    try {
      const response = await fetch(`${BASE_URL}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to start session");

      const data = await response.json();

      for (let i = 0; i < data.response.length; i++) {
        const aiMessage = new Message(
          Date.now(),
          "recipient",
          data.response[i] || "I didn't understand that."
        );
        addRecipientMessage(aiMessage);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      setErrorMessage("Error starting session. Please try again later.");
      console.error("Error starting session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunCode = async (code: string) => {
    setLoading(true);
    setErrorMessage(null); // Clear any existing errors
    try {
      const response = await fetch(`${BASE_URL}/run_code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("Failed to execute code");

      const data = await response.json();
      setCodeOutput(data.output);
    } catch (error) {
      setErrorMessage("Error executing code. Please try again later.");
      console.error("Failed to execute code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 flex flex-col">
      <AppBar />

      <main className="flex-grow flex">
        {!start && (
          <div className="flex-grow flex justify-center items-center">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={startSession}
              disabled={loading}
            >
              {loading ? "Loading..." : "Start"}
            </button>
          </div>
        )}
        {start && (
          <div
            className="flex flex-grow"
            style={{
              height: "calc(100vh - 64px)", // Adjust for AppBar height
            }}
          >
            {/* Code Editor */}
            <div
              className="flex-grow bg-white shadow-lg rounded-l-xl p-4"
              style={{
                width: "50%",
              }}
            >
              <CodeEditor
                defaultLanguage="python"
                onRun={handleRunCode}
              />
              {loading && <div className="text-center mt-4">Running code...</div>}
              {codeOutput && (
                <div className="bg-gray-200 p-4 mt-4 rounded">
                  <strong>Output:</strong>
                  <pre>{codeOutput}</pre>
                </div>
              )}
            </div>

            {/* Chat Section */}
            <div
              className="bg-white shadow-lg rounded-r-xl flex flex-col"
              style={{
                width: "50%",
              }}
            >
              {/* Chat Messages */}
              <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {sortMessages().map((message) => (
                  <MessageWidget key={message.id} message={message} />
                ))}
              </div>
              {/* Error Message */}
              {errorMessage && (
                <div className="text-red-500 text-center py-2">{errorMessage}</div>
              )}
              {/* Audio Recorder */}
              <div className="bg-gray-100 border-t border-gray-300 p-4 rounded-b-xl">
                <AudioRecorder
                  onSend={({ audioUrl, text }) =>
                    addUserMessage(
                      new Message(
                        Date.now(),
                        "user",
                        text || "Audio message sent",
                        audioUrl
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
