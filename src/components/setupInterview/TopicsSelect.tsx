import React from "react";
import { FormControlLabel, Checkbox, FormGroup, FormLabel, Box, Typography, Select, MenuItem } from "@mui/material";

interface Topic {
    id: string;
    label: string;
}

interface TopicsSelectProps {
    selectedTopics?: string[];
    onChange?: (selectedIds: string[]) => void;
}

const topics: Topic[] = [
    { id: "Binary Search", label: "Binary Search" },
    { id: "Linked Lists", label: "Linked Listss" },
    { id: "Arrays", label: "Arrays" },
    { id: "Trees", label: "Trees" },
    { id: "Graphs", label: "Graphs" },
    { id: "Dynamic Programming", label: "Dynamic Programming" },
    { id: "Stacks", label: "Stacks" },
    { id: "Queues", label: "Queues" },
];

const TopicsSelect = ({
    selectedTopics = topics.map((topic) => topic.id),
    onChange = () => { },
}: TopicsSelectProps) => {

    const handleTopicChange = (topicId: string, checked: boolean) => {
        if (checked) {
            onChange([...selectedTopics, topicId]);
        } else {
            onChange(selectedTopics.filter((id) => id !== topicId));
        }
    };

    return (
        <div className="w-full space-y-2 bg-background p-1">
            <Typography>Interview Topics</Typography>
            <div className="space-y-4">
                <FormGroup>
                    {topics.map((topic) => (
                        <FormControlLabel
                            key={topic.id}
                            control={
                                <Checkbox
                                    checked={selectedTopics.includes(topic.id)}
                                    onChange={(event) =>
                                        handleTopicChange(topic.id, event.target.checked)
                                    }
                                />
                            }
                            label={topic.label}
                        />
                    ))}
                </FormGroup>
            </div>
        </div>
    );
};

export default TopicsSelect;
