import React, { useEffect, useRef } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (window.MediaSource) {
      const mediaSource = new MediaSource();
      audioRef.current.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener("sourceopen", () => {
        const sourceBuffer = mediaSource.addSourceBuffer(
          'audio/wav; codecs="1"'
        );

        fetch(src)
          .then((response) => response.arrayBuffer())
          .then((data) => {
            sourceBuffer.appendBuffer(data);
          });
      });
    }
  }, [src]);

  return <audio controls ref={audioRef} />;
};

export default AudioPlayer;
