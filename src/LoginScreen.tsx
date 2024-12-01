import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import theme from "./theme";


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]); // Dependency on `isAuthenticated` to rerun effect when authentication state changes

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding="5%"
            sx={{ backgroundColor: "primary.main", height: "100vh", gap: 2 }}
        >
            <Avatar alt='duck' src='src\assets\avatar\talking.png'
                sx={{
                    outlineColor: "primary.contrastText", // Change outline color to white
                    outlineWidth: "3px",
                    outlineStyle: "groove", // Ensure the outline is solid
                    width: 312, // Set the width
                    height: 312, // Set the height
                    fontSize: 50, // Adjust font size for initials if no image
                    marginBottom: 2
                }} />
            <Typography variant="h1" color="primary.contrastText" sx={{ marginBottom: 2 }}>
                Talk to Duckie!
            </Typography>
            <Button
                onClick={() => loginWithRedirect()}
                variant="contained"
                color="secondary"
                sx={{
                    color: "primary.contrastText",
                    padding: "12px 24px",
                    fontSize: "1.2rem",
                   
                }}
            >
                Login with Auth0
            </Button>
        </Box>
    );
};

export default LoginButton;