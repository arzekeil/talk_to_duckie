import { Box } from "@mui/material";

const Loading = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            width: 40,
                            height: 40,
                            border: '4px solid #c28b1d',
                            borderRadius: '50%',
                            borderTop: '4px solid transparent',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <Box mt={2}>Loading...</Box>
                </Box>
            </Box>
            <style>
                {`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            `}
            </style>
        </>
    );
}

export default Loading
