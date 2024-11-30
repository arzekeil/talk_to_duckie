import React from "react";
// import { PiWaveformDuotone } from "react-icons/pi";
import Message from "../types/Message"; // Adjust the import path based on your project structure

interface MessageWidgetProps {
    message: Message; // Use the Message model as the type
}

const MessageWidget: React.FC<MessageWidgetProps> = ({ message }) => {
    return (
        <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} w-full`}>
            {message.sender === "user" ? (
                // <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12">
                //     {/* <PiWaveformDuotone size={24} /> */}
                //     {message.text}
                // </div>
                <div className="bg-blue-300 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                    {message.text}
                </div>
            ) : (
                <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default MessageWidget;
