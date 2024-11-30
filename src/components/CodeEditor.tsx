import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";

type CodeEditorProps = {
    defaultLanguage?: string;
    theme?: string;
    onRun?: (code: string) => void;
    timer?: number; // Timer in seconds
};

const CodeEditor: React.FC<CodeEditorProps> = ({
    defaultLanguage = "python",
    theme = "vs-dark",
    onRun,
    timer = 0, // Initial timer value in seconds
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
        // Start the timer countdown
        let timerInterval: NodeJS.Timeout;
        if (currentTime > 0) {
            timerInterval = setInterval(() => {
                setCurrentTime((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);
        }

        // Cleanup interval on unmount
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [currentTime]);

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
