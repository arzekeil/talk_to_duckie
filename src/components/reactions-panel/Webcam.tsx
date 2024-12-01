import { useRef, useEffect, useState } from "react";

const WebcamComponent = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true, // Access the video stream
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream; // Assign the stream to the video element
                }
            } catch (err) {
                setError("Could not access the webcam. Please ensure it's connected and permissions are granted.");
                console.error("Webcam error:", err);
            }
        };

        startWebcam();

        return () => {
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop()); // Stop all tracks when the component unmounts
            }
        };
    }, []);

    return (
        <div>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        width: "256px",
                        height: "256px",
                        border: "2px solid #ccc", // Optional: Add a border
                        objectFit: "cover", // Ensures the video fits the circular frame
                        backgroundColor: "#000", // Optional: Fallback background color
                    }}
                />
            )}
        </div>
    );
};

export default WebcamComponent;
