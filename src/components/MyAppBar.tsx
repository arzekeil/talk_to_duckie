import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Link, Box } from "@mui/material";
import imageMap from "../components/reactions-panel/imageMap";

const MyAppBar: React.FC = () => {
    const APP_BAR_HEIGHT = '64px';
    const filePath = imageMap['talking'];
    return (
        <AppBar position="static" sx={{ height: `${APP_BAR_HEIGHT}px`, backgroundColor: '#c28b1d' }}>
            <Toolbar>
                <Link href="/" color="inherit" underline="none">
                    <Box display="flex" alignItems="center">
                        <Avatar alt='duck' src={filePath}
                            sx={{
                                outlineColor: "primary.contrastText",
                                outlineWidth: "1px",
                                outlineStyle: "solid",
                                width: 36,
                                height: 36,
                                marginRight: 1,
                            }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight={'bold'}>
                            Talk to Duckie!
                        </Typography>
                    </Box>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
