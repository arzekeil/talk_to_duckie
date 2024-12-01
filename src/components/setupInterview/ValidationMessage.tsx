import React from "react";
import { ErrorOutline } from '@mui/icons-material';
import { Alert, AlertTitle, Typography } from '@mui/material';

interface ValidationMessageProps {
    message?: string;
    visible?: boolean;
}

const ValidationMessage = ({
    message = "Please complete all required fields",
    visible = false,
}: ValidationMessageProps) => {
    if (!visible) return null;

    return (
        <div className="w-full bg-background p-1">
            <Alert className="h-10 py-2">
                <ErrorOutline className="h-4 w-4" />
                <Typography className="ml-2 text-sm">{message}</Typography>
            </Alert>
        </div>
    );
};

export default ValidationMessage;
