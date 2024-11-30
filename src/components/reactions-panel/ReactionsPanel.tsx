import Box from "@mui/material/Box";

import WebcamComponent from "./Webcam";
import AIAvatar from "./AIAvatar";

const ReactionsPanel = () => {
    return (
        <Box
            display="flex"
            flexDirection="column" // Stack components vertically
            sx={{
                height: "90vh", // Full viewport height
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
                <AIAvatar />
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