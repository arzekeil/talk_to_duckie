import { Select, MenuItem, Typography } from "@mui/material";

interface TimerSelectProps {
    value?: string;
    onChange?: (value: string) => void;
}

const TimerSelect = ({
    value = "",
    onChange = () => { },
}: TimerSelectProps) => {
    const timerOptions = [
        { value: "2", label: "2 minutes" },
        { value: "10", label: "10 minutes" },
        { value: "20", label: "20 minutes" },
        { value: "45", label: "45 minutes" },
    ];

    return (
        <div className="w-full space-y-2 bg-background p-1">
            <Typography >Interview Duration</Typography>
            <Select fullWidth value={value} onChange={(e) => onChange(e.target.value)}>
                <MenuItem value="" disabled>
                    <em>Select duration</em>
                </MenuItem>
                {timerOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default TimerSelect;
