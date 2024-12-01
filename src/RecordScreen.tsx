import React, { useEffect, useRef, useState } from "react";
import MessageWidget from "./widgets/MessageWidget";
import AudioRecorder from "./components/AudioRecorder";
import Message from "./types/Message";
import CodeEditor from "./components/CodeEditor";
import { Box, Button, Paper, Typography, Switch, FormControlLabel, Modal } from "@mui/material";
import { Editor } from "@monaco-editor/react";

import { MuiMarkdown } from 'mui-markdown';
import ReactionsPanel from "./components/reactions-panel/ReactionsPanel";

const BASE_URL = import.meta.env.VITE_API;

const App: React.FC = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [recipientMessages, setRecipientMessages] = useState<Message[]>([]);
  const [start, setStart] = useState(false);
  const sessionStartedRef = useRef(false); // Tracks whether the session has started
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [showMessages, setShowMessages] = useState(false); // State to toggle message visibility
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const timer = 120;  // 2 mins
  const [timerStart, setTimerStart] = useState(false);
  const [duckFace, setDuckFace] = useState("talking");

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
        const words = messageLine.split(" ");
        const lastWord = words[words.length - 1];
        let aiMessage;
        let emote = "talking";
        if (lastWord.startsWith("(") && lastWord.endsWith(")")) {
          aiMessage = new Message(Date.now(), "recipient", words.slice(0, -1).join(" "));
          emote = lastWord.slice(1, -1);
        } else {
          aiMessage = new Message(Date.now(), "recipient", messageLine);
        }
        addRecipientMessage(aiMessage);
        setDuckFace(emote);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
    }
  };

  const startSession = async () => {
    if (sessionStartedRef.current) return; // Prevent duplicate calls
    sessionStartedRef.current = true; // Mark session as started

    setStart(true);

    try {
      const response = await fetch(`${BASE_URL}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timerValue: timer }),
      });

      if (!response.ok) throw new Error("Failed to start session");

      const data = await response.json();

      for (let i = 0; i < data.response.length; i++) {
        const messageLine = data.response[i] || "I didn't understand that.";

        if (messageLine.startsWith("Question:")) {

          setQuestion(`${messageLine.split("Question: ")[1]}`);
          setTimerStart(true);
          continue;
        }
        const aiMessage = new Message(
          Date.now(),
          "recipient",
          messageLine,
        );
        addRecipientMessage(aiMessage);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error("Error starting session:", error);
    } finally {
    }
  };

  const handleRunCode = async (code: string) => {
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
        if (messageLine.startsWith("END_SESSION")) {
          setShowFeedback(true);
          console.log(data.response[i + 1]);
          setFeedback(data.response[i + 1]);
          break;
        }

        const words = messageLine.split(" ");
        const lastWord = words[words.length - 1];
        let aiMessage;
        let emote = "talking";
        if (lastWord.startsWith("(") && lastWord.endsWith(")")) {
          aiMessage = new Message(Date.now(), "recipient", words.slice(0, -1).join(" "));
          emote = lastWord.slice(1, -1);
        } else {
          aiMessage = new Message(Date.now(), "recipient", messageLine);
        }
        addRecipientMessage(aiMessage);
        setDuckFace(emote);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Failed to execute code:", error);
    } finally {
    }
  };

  const readAloud = (text: string | undefined) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Adjust speed
    utterance.pitch = 1; // Adjust pitch
    synth.speak(utterance);
  };

  useEffect(() => {
    // Automatically start the session when the screen is rendered
    if (!start) {
      startSession();
    }
  }, []);

  return (
    <Box flexGrow={1} display="flex" height="calc(100vh - 64px)">
      {/* Code Editor Section */}
      <Box
        flex={6} // 50% width
        bgcolor="white"
        boxShadow={3}
        borderRadius={2}
        p={2}
        display="flex"
        flexDirection="column"
      >
        <Editor
          height="40vh"
          defaultLanguage="python"
          theme="vs-dark"
          value={question}
          options={{ readOnly: true, lineNumbers: "off" }}
        />
        <CodeEditor
          defaultLanguage="python"
          theme="vs-dark"
          timer={timer}
          onRun={handleRunCode}
          addRecipientMessage={addRecipientMessage}
          setShowFeedback={setShowFeedback}
          setFeedback={setFeedback}
          timerStart={timerStart}
        />
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
        flex={3} // 30% width
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
      </Box>

      {/* Reactions Panel */}
      <Box flex={1} // 20% width
        display="flex"
        flexDirection="column"
      >
        <ReactionsPanel mood={duckFace} />
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
      <Modal open={showFeedback} onClose={() => setShowFeedback(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Feedback
          </Typography>

          <MuiMarkdown>
            {feedback}
          </MuiMarkdown>
          <Button variant="contained" color="primary" onClick={() => setShowFeedback(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default App;
