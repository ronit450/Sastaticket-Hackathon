import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./VideoRecorder.css";
import { Link, useNavigate } from "react-router-dom";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(15);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    if (recording && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (recording && timer === 0) {
      stopRecording();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [recording, timer]);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setRecording(true);
          setTimer(15);

          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9",
            videoBitsPerSecond: 2500000,
          });

          let recordedChunks = [];

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };

          mediaRecorderRef.current.onstop = () => {
            const fullBlob = new Blob(recordedChunks, { type: "video/webm" });
            uploadVideo(fullBlob);
            recordedChunks = [];

            setTimeout(() => {
              navigate("/popup1");
            }, 200);
          };

          mediaRecorderRef.current.start();
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setRecording(false);
    uploadVideo();
    setShowButton(true);
  };

  const uploadVideo = async (blob) => {
    const formData = new FormData();
    formData.append("video", blob);

    try {
      await axios.post("http://127.0.0.1:5000/api/upload", formData);
      console.log("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="video-recorder-container">
      <h2 className="video-recorder-title">Welcome to Video Recorder</h2>
      <p className="video-recorder-instructions">
        Click the "Start Recording" button below to start recording a video.
        Please ensure your camera is enabled. You will have 15 seconds of
        recording time.
      </p>
      <div className="rectangle-frame">
        <video ref={videoRef} className="video-recorder-video" />
        {recording && (
          <div className="circular-progress">
            <div
              className="progress-bar"
              style={{
                animationDuration: `${timer}s`,
              }}
            />
          </div>
        )}
      </div>

      {!recording && !showButton && (
        <button className="video-recorder-button" onClick={startRecording}>
          Start Recording
        </button>
      )}

      {recording && (
        <p className="video-recorder-timer">Recording Time: {timer}s</p>
      )}


    </div>
  );
};

export default VideoRecorder;