import React, { useState } from "react";
import Editor from "@monaco-editor/react";

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
        <div className="flex flex-col h-[90vh] p-2">
            <div className="mb-2">
                <select
                    value={language}
                    onChange={(e) => {
                        const newLang = e.target.value;
                        setLanguage(newLang);
                        setCode(defaultSamples[newLang] || "");
                    }}
                    className="px-2 py-1 border rounded"
                >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                </select>
            </div>
            <div className="flex-grow">
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
            </div>
            <div className="mt-2 text-center">
                <button
                    onClick={handleRun}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Run
                </button>
            </div>
        </div>
    );
};

export default CodeEditor;
