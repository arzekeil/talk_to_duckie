import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const MyAppBar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#c28b1d' }}>
            <Toolbar>
                <Link href="/" color="inherit" underline="none">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight={'bold'}>
                        Talk to Duckie
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
