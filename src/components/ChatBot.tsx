// src/components/ChatBot.tsx
import React, { useState } from 'react';
import { interactWithVoiceflow, VoiceflowResponse } from '../voiceflowService';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const responses: VoiceflowResponse[] = await interactWithVoiceflow('user123', input);
            const botMessages: Message[] = responses
                .filter((res) => res.type === 'text')
                .map((res) => ({
                    sender: 'bot',
                    text: res.payload.text || 'Sorry, I didn’t get that.',
                }));

            setMessages((prev) => [...prev, ...botMessages]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <div>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    height: '300px',
                    overflowY: 'auto',
                    marginBottom: '1rem',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === 'user' ? 'right' : 'left',
                            margin: '0.5rem 0',
                        }}
                    >
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                style={{ width: 'calc(100% - 80px)', padding: '0.5rem' }}
            />
            <button onClick={handleSendMessage} style={{ padding: '0.5rem', width: '70px' }}>
                Send
            </button>
        </div>
    );
};

export default ChatBot;
