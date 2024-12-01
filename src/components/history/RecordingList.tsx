import React from "react";
import RecordingCard from "./RecordingCard.tsx";

interface Recording {
    id: string;
    title: string;
    timestamp: string;
    duration: number;
    currentTime: number;
    waveformData?: number[];
    notes: string;
    isPlaying: boolean;
    isExpanded: boolean;
}

interface RecordingListProps {
    recordings?: Recording[];
    onToggle?: (id: string) => void;
    onPlay?: (id: string) => void;
    onPause?: (id: string) => void;
    onStop?: (id: string) => void;
    onSeek?: (id: string, time: number) => void;
    onSaveNotes?: (id: string, notes: string) => void;
    onLoadMore?: () => void;
    disabled?: boolean;
}

const RecordingList = ({
    recordings = [
        {
            id: "1",
            title: "binary search",
            timestamp: new Date().toLocaleString(),
            duration: 180,
            currentTime: 0,
            notes: "i like it!",
            isPlaying: false,
            isExpanded: false,
        },
        {
            id: "2",
            title: "dynamic programming",
            timestamp: new Date(Date.now() - 1640000).toLocaleString(),
            duration: 120,
            currentTime: 0,
            notes: "it was very hard",
            isPlaying: false,
            isExpanded: false,
        },
    ],
    onToggle = () => { },
    onPlay = () => { },
    onPause = () => { },
    onStop = () => { },
    onSeek = () => { },
    onSaveNotes = () => { },
    onLoadMore = () => { },
    disabled = false,
}: RecordingListProps) => {
    // Intersection Observer for infinite scroll
    const observerTarget = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            { threshold: 0.5 },
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [onLoadMore]);

    return (
        <div className="p-4 space-y-4">
            {recordings.map((recording) => (
                <RecordingCard
                    key={recording.id}
                    title={recording.title}
                    timestamp={recording.timestamp}
                    duration={recording.duration}
                    currentTime={recording.currentTime}
                    waveformData={recording.waveformData}
                    notes={recording.notes}
                    isPlaying={recording.isPlaying}
                    isExpanded={recording.isExpanded}
                    onToggle={() => onToggle(recording.id)}
                    onPlay={() => onPlay(recording.id)}
                    onPause={() => onPause(recording.id)}
                    onStop={() => onStop(recording.id)}
                    onSeek={(time) => onSeek(recording.id, time)}
                    onSaveNotes={(notes) => onSaveNotes(recording.id, notes)}
                    disabled={disabled}
                />
            ))}
            <div ref={observerTarget} className="h-4" />
        </div>
    );
};

export default RecordingList;
