import "./App.css";
import backward from "./images/icons8-rewind-64.png";
import play from "./images/icons8-play-64.png";
import forward from "./images/icons8-fast-forward-64.png";
import pause from "./images/icons8-pause-64.png";
import { useRef, useState } from "react";

const App = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
      let vid = document.getElementById("video1");
      setVideoTime(vid.duration);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  window.setInterval(function () {
    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  return (
    <div className="app">
      <video
        id="video1"
        ref={videoRef}
        className="video"
        src="https://res.cloudinary.com/dssvrf9oz/video/upload/v1635662987/pexels-pavel-danilyuk-5359634_1_gmixla.mp4"></video>
      <div className="controlsContainer">
        <div className="controls">
          <img
            onClick={revert}
            className="controlsIcon"
            alt="backward"
            src={backward}
          />
          {playing ? (
            <img
              onClick={() => videoHandler("pause")}
              className="controlsIcon--small"
              alt="pause"
              src={pause}
            />
          ) : (
            <img
              onClick={() => videoHandler("play")}
              className="controlsIcon--small"
              alt="play"
              src={play}
            />
          )}
          <img
            onClick={fastForward}
            className="controlsIcon"
            alt="forward"
            src={forward}
          />
        </div>
      </div>
      <div className="timecontrols">
        <p className="controlsTime">
          {Math.floor(currentTime / 60) +
            ":" +
            ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </p>
        <div className="time_progressbarContainer">
          <div
            style={{ width: `${progress}%` }}
            className="time_progressBar"></div>
        </div>
        <p className="controlsTime">
          {Math.floor(videoTime / 60) +
            ":" +
            ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </p>
      </div>
    </div>
  );
};

export default App;
