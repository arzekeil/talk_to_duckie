

interface RecordingDetailsProps {
    title?: string;
    duration?: number;
    currentTime?: number;
    waveformData?: number[];
    notes?: string;
    isPlaying?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
    onStop?: () => void;
    onSeek?: (time: number) => void;
    onSaveNotes?: (notes: string) => void;
    disabled?: boolean;
}

const RecordingDetails = ({
    title = "Untitled Recording",
    notes = "",
}: RecordingDetailsProps) => {
    return (
        <div className="w-full bg-background p-6 rounded-lg border space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p>
                {notes}
            </p>
            <p>
                transcript data + feedback here
            </p>
        </div>
    );
};

export default RecordingDetails;
