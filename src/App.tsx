// src/App.tsx
import React from 'react';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Voiceflow AI Chat</h1>
      <ChatBot />
    </div>
  );
};

export default App;
