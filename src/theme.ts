// theme.ts

import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Primary color (blue)
            light: '#63a4ff', // Light variant
            dark: '#004ba0', // Dark variant
            contrastText: '#ffffff', // Text color for primary buttons
        },
        secondary: {
            main: '#dc004e', // Secondary color (red)
            light: '#ff5c8d', // Light variant
            dark: '#9a0036', // Dark variant
            contrastText: '#ffffff', // Text color for secondary buttons
        },
        background: {
            default: '#f5f5f5', // Default background color
            paper: '#ffffff', // Background for cards and dialogs
        },
        text: {
            primary: '#333333', // Default text color
            secondary: '#555555', // Secondary text color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
