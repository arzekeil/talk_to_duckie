import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface AudioRecorderProps {
    onSend: (message: { audioUrl: string; text?: string }) => void; // Callback to send a new message with audio URL and text
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSend }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
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
                const blob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
                audioChunksRef.current = [];
                const audioUrl = URL.createObjectURL(blob);

                const text = await sendToWhisperAPI(blob); // Transcribe the audio
                onSend({ audioUrl, text }); // Send both audio URL and transcription to the parent

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
        <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Timer Display */}
            <div
                className="text-center text-gray-700 font-bold mb-2"
                style={{ visibility: isRecording ? "visible" : "hidden" }}
            >
                Recording: {formatTime(recordingTime)}
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-center w-full h-full">
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center justify-center w-14 h-14 rounded-full text-white focus:outline-none ${isRecording
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-red-600 hover:bg-red-700"
                        }`}
                >
                    {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
                </button>
            </div>
        </div>
    );
};

export default AudioRecorder;
