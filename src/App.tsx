import React, { useState } from "react";
import MyAppBar from "./components/MyAppBar";
import MessageWidget from "./widgets/MessageWidget";
import AudioRecorder from "./components/AudioRecorder";
import Message from "./types/Message";
import CodeEditor from "./components/CodeEditor";
import { Box, Button, CircularProgress, Paper, Typography, Switch, FormControlLabel } from "@mui/material";

const BASE_URL = "http://localhost:5000";

const App: React.FC = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [recipientMessages, setRecipientMessages] = useState<Message[]>([]);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [showMessages, setShowMessages] = useState(true); // State to toggle message visibility

  const addUserMessage = (message: Message) => {
    setUserMessages((prevMessages) => [...prevMessages, message]);
    getAIResponse(message.text || "");
  };

  const addRecipientMessage = (message: Message) => {
    setRecipientMessages((prevMessages) => [...prevMessages, message]);
    readAloud(message.text); // Trigger TTS for recipient messages
  };

  const sortMessages = () => {
    return [...userMessages, ...recipientMessages].sort((a, b) => a.id - b.id);
  };

  const getAIResponse = async (userText: string) => {
    setLoading(true);
    setErrorMessage(null);
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
        const messageLine = data.response[i] || "I didn't understand that.";
        if (messageLine.startsWith("Question:")) {
          setQuestion(`# ${messageLine.split("Question: ")[1]}`);
          continue;
        }
        const aiMessage = new Message(Date.now(), "recipient", messageLine);
        addRecipientMessage(aiMessage);
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    setErrorMessage(null);
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
    setErrorMessage(null);
    try {
      const response = await fetch(`${BASE_URL}/submit_code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("Failed to execute code");

      const data = await response.json();
      setCodeOutput(data.output);

      for (let i = 0; i < data.response.length; i++) {
        const messageLine = data.response[i] || "I didn't understand that.";

        const aiMessage = new Message(Date.now(), "recipient", messageLine);
        addRecipientMessage(aiMessage);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      setErrorMessage("Error executing code. Please try again later.");
      console.error("Failed to execute code:", error);
    } finally {
      setLoading(false);
    }
  };

  const readAloud = (text: string | undefined) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Adjust speed
    utterance.pitch = 2; // Adjust pitch
    synth.speak(utterance);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="grey.100">
      <MyAppBar />

      <Box flexGrow={1} display="flex">
        {!start && (
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={startSession}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Start Session"}
            </Button>
          </Box>
        )}
        {start && (
          <Box display="flex" flexGrow={1} height="calc(100vh - 64px)">
            {/* Code Editor */}
            <Box
              flex={1}
              bgcolor="white"
              boxShadow={3}
              borderRadius={2}
              p={2}
              display="flex"
              flexDirection="column"
            >
              <CodeEditor defaultLanguage="python" onRun={handleRunCode} />
              {loading && (
                <Typography variant="body1" textAlign="center" mt={2}>
                  Running code...
                </Typography>
              )}
              {codeOutput && (
                <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Output:
                  </Typography>
                  <Typography variant="body2" component="pre">
                    {codeOutput}
                  </Typography>
                </Paper>
              )}
            </Box>

            {/* Chat Section */}
            <Box
              flex={1}
              bgcolor="white"
              boxShadow={3}
              borderRadius={2}
              display="flex"
              flexDirection="column"
            >
              {/* Toggle Switch */}
              <Box p={2} display="flex" justifyContent="flex-end">
                <FormControlLabel
                  control={
                    <Switch
                      checked={showMessages}
                      onChange={() => setShowMessages((prev) => !prev)}
                      color="primary"
                    />
                  }
                  label="Show Messages"
                />
              </Box>

              {/* Messages Wrapper */}
              <Box flexGrow={1} display="flex" flexDirection="column" overflow="auto" p={2}>
                {showMessages &&
                  sortMessages().map((message) => (
                    <Box key={message.id} mb={1} px={1}>
                      <MessageWidget message={message} />
                    </Box>
                  ))}
              </Box>

              {/* Audio Recorder */}
              <Box
                p={2}
                bgcolor="grey.200"
                borderTop="1px solid"
                borderColor="grey.300"
              >
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
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default App;
