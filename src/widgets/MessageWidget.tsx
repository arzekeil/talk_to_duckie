import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Message from "../types/Message"; // Adjust the import path based on your project structure

interface MessageWidgetProps {
    message: Message; // Use the Message model as the type
}

const MessageWidget: React.FC<MessageWidgetProps> = ({ message }) => {
    return (
        <Box
            display="flex"
            justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
            width="100%"
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    maxWidth: "300px",
                    backgroundColor: message.sender === "user" ? "primary.light" : "grey.300",
                    color: message.sender === "user" ? "primary.contrastText" : "text.primary",
                    borderRadius: 2,
                }}
            >
                <Typography variant="body1">{message.text}</Typography>
            </Paper>
        </Box>
    );
};

export default MessageWidget;
