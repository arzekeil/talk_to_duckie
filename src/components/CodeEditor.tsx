import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, Button, MenuItem, Select } from "@mui/material";

type CodeEditorProps = {
    defaultLanguage?: string;
    theme?: string;
    onRun?: (code: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
    defaultLanguage = "python",
    theme = "vs-dark",
    onRun,
}) => {
    const defaultSamples: Record<string, string> = {
        python: "print('Hello, world!')",
        javascript: "console.log('Hello, world!');",
        typescript: "console.log('Hello, TypeScript!');",
    };

    const [code, setCode] = useState<string>(defaultSamples[defaultLanguage] || "");
    const [language, setLanguage] = useState<string>(defaultLanguage);

    const handleRun = () => {
        if (onRun) {
            onRun(code);
        } else {
            console.log("Running code:", code);
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="90vh" p={2}>
            {/* Language Selector */}
            <Box mb={2}>
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
