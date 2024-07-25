import React, { useState, useRef, useCallback } from "react";

const LargeAudioPlayer = ({ fileUrl }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(progress);

  const downloadFile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const contentLength = +response.headers.get("Content-Length");
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        // Calculate and update the download progress
        const percentage = Math.round((receivedLength / contentLength) * 100);
        if (percentage !== progressRef.current) {
          progressRef.current = percentage;
          setProgress(percentage);
        }
      }

      const blob = new Blob(chunks);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
      setError("Error downloading the file. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fileUrl]);

  return (
    <div>
      <button onClick={downloadFile} disabled={loading}>
        {loading ? "Downloading..." : "Download and Play"}
      </button>
      {loading && <p>Downloading: {progress}%</p>}
      {error && <p>{error}</p>}
      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          ref={audioRef}
          onEnded={() => URL.revokeObjectURL(audioUrl)}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default LargeAudioPlayer;
