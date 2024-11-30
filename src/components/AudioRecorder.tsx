import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface AudioRecorderProps {
    onSend: (message: { audioUrl: string; text?: string }) => void; // Callback to send a new message with audio URL and text
}

const RecordingButton = styled(Button)(({ theme }) => ({
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    boxShadow: theme.shadows[4],
    "&:hover": {
        transform: "scale(1.1)",
        boxShadow: theme.shadows[6],
    },
}));

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSend }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isTranscribing, setIsTranscribing] = useState<boolean>(false); // Loading state for transcription
    const [recordingTime, setRecordingTime] = useState<number>(0); // Timer state in seconds
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // Timer reference
    const whisperEndpoint = "http://localhost:3000/proxy/asr?task=transcribe&output=json";

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                setIsTranscribing(true); // Start loading state
                const blob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
                audioChunksRef.current = [];
                const audioUrl = URL.createObjectURL(blob);

                const text = await sendToWhisperAPI(blob); // Transcribe the audio
                onSend({ audioUrl, text }); // Send both audio URL and transcription to the parent

                setIsTranscribing(false); // End loading state
                setRecordingTime(0); // Reset the timer
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);

        // Stop timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const sendToWhisperAPI = async (audioBlob: Blob): Promise<string | undefined> => {
        const formData = new FormData();
        formData.append("audio_file", audioBlob, "audio.mp3");

        try {
            const response = await fetch(whisperEndpoint, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.text; // Return the transcription text
            } else {
                console.error("Failed to transcribe audio:", response);
                return undefined;
            }
        } catch (error) {
            console.error("Error sending audio to Whisper API:", error);
            return undefined;
        }
    };

    // Format the recording time as mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            padding={2}
        >
            {/* Timer Display */}
            {isRecording && (
                <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{ mb: 2, transition: "opacity 0.3s" }}
                >
                    Recording: {formatTime(recordingTime)}
                </Typography>
            )}

            {/* Loading Indicator */}
            {isTranscribing && (
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <CircularProgress size={24} color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="primary">
                        Transcribing...
                    </Typography>
                </Box>
            )}

            {/* Recording Controls */}
            <RecordingButton
                onClick={isRecording ? stopRecording : startRecording}
                sx={{
                    bgcolor: isRecording ? "error.main" : "success.main",
                    "&:hover": {
                        bgcolor: isRecording ? "error.dark" : "success.dark",
                    },
                }}
            >
                {isRecording ? <FaStop /> : <FaMicrophone />}
            </RecordingButton>
        </Box>
    );
};

export default AudioRecorder;
