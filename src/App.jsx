import AudioPlayer from "./AudioPlayer";
import LargeAudioPlayer from "./LargeAudioPlayer";

function App() {
  return (
    <div>
      {/* Download and play file - will take some time  */}
      <LargeAudioPlayer
        fileUrl={
          "https://dbj64m8271a9g.cloudfront.net/fbd7c0201ca056d3d66681c4b1268a0c4f6fb58c_MPNt5FN8Tj.wav"
        }
      />

      {/* MediaSource doesn't support wav files */}
      {/* <AudioPlayer
        src={
          "https://dbj64m8271a9g.cloudfront.net/fbd7c0201ca056d3d66681c4b1268a0c4f6fb58c_MPNt5FN8Tj.wav"
        }
      /> */}
    </div>
  );
}

export default App;
