import { useState } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import TimerSelect from "./TimerSelect.tsx";
import TopicsSelect from "./TopicsSelect.tsx";
import StartButton from "./StartButton.tsx";
// import ValidationMessage from "./ValidationMessage";

interface InterviewSetupFormProps {
    onSubmit?: (data: { duration: string; topics: string[] }) => void;
}

const InterviewSetupForm = ({
    onSubmit = () => { },
}: InterviewSetupFormProps) => {
    const [duration, setDuration] = useState("2");
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const isFormValid = duration && selectedTopics.length > 0 ? true : false;

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        }
        onSubmit({ duration, topics: selectedTopics });
    };

    return (
        <Card className="w-[480px] bg-background">
            <CardHeader className="pb-2"
                title={
                    <Typography variant="h2" color="secondary.main">
                        Setup Mock Interview
                    </Typography>
                }
            />
            <CardContent className="pt-2">
                <TimerSelect value={duration} onChange={setDuration} />
                <TopicsSelect
                    onChange={setSelectedTopics}
                />
                <StartButton isValid={isFormValid} onClick={handleSubmit} />
            </CardContent>
        </Card>
    );
};

export default InterviewSetupForm;
