import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface StartButtonProps {
    isValid?: boolean;
    onClick?: () => void;
}

const StartButton = ({ }: StartButtonProps) => {
    return (
        <div className="w-full bg-background p-1">
            <Link to="/mock">
                <Button variant="contained" color="primary">
                    Start Meeting
                </Button>
            </Link>
        </div>
    );
};

export default StartButton;
