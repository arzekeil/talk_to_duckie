import Box from "@mui/material/Box";

import WebcamComponent from "./Webcam";
import AIAvatar from "./AIAvatar";

interface ReactionsPanelProps {
    mood: string;
}

const ReactionsPanel = ({ mood }: ReactionsPanelProps) => {
    return (
        <Box

            display="flex"
            flexDirection="column" // Stack components vertically
            sx={{
                height: "100vh", // Full viewport height
            }}
        >
            <Box
                sx={{
                    flex: 1, // Take equal space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AIAvatar fileName={mood} />
            </Box>

            <Box
                sx={{
                    flex: 1, // Take equal space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <WebcamComponent />
            </Box>
        </Box>
    );
};

export default ReactionsPanel;