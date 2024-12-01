import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card
} from "@mui/material";
import { AccessTime as Clock, ExpandLess as ChevronUp, ExpandMore as ChevronDown } from "@mui/icons-material";
import RecordingDetails from "./RecordingDetails.tsx";

interface RecordingCardProps {
    title?: string;
    timestamp?: string;
    duration?: number;
    currentTime?: number;
    waveformData?: number[];
    notes?: string;
    isPlaying?: boolean;
    isExpanded?: boolean;
    onToggle?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onStop?: () => void;
    onSeek?: (time: number) => void;
    onSaveNotes?: (notes: string) => void;
    disabled?: boolean;
}

const RecordingCard = ({
    title = "Untitled Recording",
    timestamp = new Date().toLocaleString(),
    duration = 180,
    currentTime = 0,
    waveformData,
    notes = "",
    isPlaying = false,
    isExpanded = false,
    // onToggle = () => { },
    onPlay = () => { },
    onPause = () => { },
    onStop = () => { },
    onSeek = () => { },
    onSaveNotes = () => { },
    disabled = false,
}: RecordingCardProps) => {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <Card className="bg-background">
            <Accordion>
                <AccordionSummary className=" justify-between">

                    <div className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <h3 className="text-base font-medium">{title}</h3>
                                <p className="text-sm text-muted-foreground">{timestamp}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{formatDuration(duration)}</span>
                            </div>
                            {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="p-4 pt-0">
                        <RecordingDetails
                            title={title}
                            duration={duration}
                            currentTime={currentTime}
                            waveformData={waveformData}
                            notes={notes}
                            isPlaying={isPlaying}
                            onPlay={onPlay}
                            onPause={onPause}
                            onStop={onStop}
                            onSeek={onSeek}
                            onSaveNotes={onSaveNotes}
                            disabled={disabled}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </Card>
    );
};

export default RecordingCard;
