import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Message from "../types/Message";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";


const BASE_URL = "http://localhost:5000";



type CodeEditorProps = {
    defaultLanguage?: string;
    theme?: string;
    onRun?: (code: string) => void;
    timer?: number; // Timer in seconds
    addRecipientMessage: (message: Message) => void;
    setErrorMessage: (error: string) => void;
    setShowFeedback: (show: boolean) => void;
    setFeedback: (feedback: string) => void;
    timerStart: boolean;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
    defaultLanguage = "python",
    theme = "vs-dark",
    onRun,
    timer = 0, // Initial timer value in seconds
    addRecipientMessage,
    setErrorMessage,
    setShowFeedback,
    setFeedback,
    timerStart,
}) => {
    const defaultSamples: Record<string, string> = {
        python: "print('Hello, world!')",
        javascript: "console.log('Hello, world!');",
        typescript: "console.log('Hello, TypeScript!');",
    };

    const [code, setCode] = useState<string>(defaultSamples[defaultLanguage] || "");
    const [language, setLanguage] = useState<string>(defaultLanguage);
    const [currentTime, setCurrentTime] = useState<number>(timer);

    useEffect(() => {
        // Reset the timer when the timer prop changes
        setCurrentTime(timer);
    }, [timer]);

    const timer_end = async () => {
        try {
            const response = await fetch(`${BASE_URL}/timer_end`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch AI response");

            const data = await response.json();

            for (let i = 0; i < data.response.length; i++) {
                const messageLine = data.response[i] || "I didn't understand that.";
                if (messageLine.startsWith("END_SESSION")) {
                    setShowFeedback(true);
                    setFeedback(data.response[i + 1]);
                    break;
                }
                const aiMessage = new Message(Date.now(), "recipient", messageLine);
                addRecipientMessage(aiMessage);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (error) {
            setErrorMessage("Error fetching AI response. Please try again later.");
            console.error("Error fetching AI response:", error);
        }
    }
    useEffect(() => {
        if (!timerStart) return;
        // Start the timer countdown
        let timerInterval: NodeJS.Timeout;
        if (currentTime > 0) {
            timerInterval = setInterval(() => {
                setCurrentTime((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);
        } else {
            // Timer has reached 0, end the session
            timer_end();
        }

        // Cleanup interval on unmount
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [currentTime, timerStart]);

    const handleRun = () => {
        if (onRun) {
            onRun(code);
        } else {
            console.log("Running code:", code);
        }
    };

    // Helper function to format timer as MM:SS
    const formatTimer = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <Box display="flex" flexDirection="column" height="90vh" p={2}>
            {/* Top Bar with Language Selector and Timer */}
            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                {/* Language Selector */}
                <Select
                    value={language}
                    onChange={(e) => {
                        const newLang = e.target.value;
                        setLanguage(newLang);
                        setCode(defaultSamples[newLang] || "");
                    }}
                    variant="outlined"
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="javascript">JavaScript</MenuItem>
                    <MenuItem value="typescript">TypeScript</MenuItem>
                </Select>

                {/* Timer Display */}
                <Typography variant="h6" sx={{ ml: 2 }}>
                    Timer: {formatTimer(currentTime)}
                </Typography>
            </Box>

            {/* Code Editor */}
            <Box flexGrow={1}>
                <Editor
                    height="100%"
                    language={language}
                    theme={theme}
                    value={code}
                    onChange={(newValue) => setCode(newValue || "")}
                    options={{
                        automaticLayout: true,
                        wordWrap: "on",
                    }}
                />
            </Box>

            {/* Run Button */}
            <Box mt={2} textAlign="right">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRun}
                    sx={{ py: 1, px: 4 }}
                >
                    Run
                </Button>
            </Box>
        </Box>
    );
};

export default CodeEditor;
