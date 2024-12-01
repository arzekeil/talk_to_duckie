// theme.ts

import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#c28b1d',
            light: '#c28b1d', // Light variant
            dark: '#AB5F13', // Dark variant
            contrastText: '#F3F9E3', // Text color for primary buttons
        },
        secondary: {
            main: '#69140E', // Secondary color (red)
            light: '#ff5c8d', // Light variant
            dark: '#5A0F09', // Dark variant
            contrastText: '#F3F9E3', // Text color for secondary buttons
        },
        background: {
            default: '#f5f5f5', // Default background color
            paper: '#f5f5f5', // Background for cards and dialogs
        },
        text: {
            primary: '#333333', // Default text color
            secondary: '#555555', // Secondary text color
        },
    },
    typography: {
        fontFamily: '"Parkinsans", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', // Disable uppercase styling for buttons
            fontWeight: 600,
        },
    },
    spacing: 8, // Default spacing unit (e.g., 8px for 1 unit)
    breakpoints: {
        values: {
            xs: 0, // Extra-small screens
            sm: 600, // Small screens
            md: 960, // Medium screens
            lg: 1280, // Large screens
            xl: 1920, // Extra-large screens
        },
    },
    shape: {
        borderRadius: 8, // Default border radius
    },
});

export default theme;
