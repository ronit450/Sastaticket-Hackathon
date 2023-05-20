import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./VideoRecorder.scss";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(15);

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
          setTimer(15); // Reset the timer when starting a new recording

          // Create a new MediaRecorder instance
          mediaRecorderRef.current = new MediaRecorder(stream);
          const chunks = [];

          // Store recorded data chunks
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          // When recording stops, save the recorded file
          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "recorded-video.webm";
            a.click();
            window.URL.revokeObjectURL(url);
          };

          // Start recording
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
  };

  const uploadVideo = async () => {
    const videoBlob = await fetch(videoRef.current.srcObject)
      .then((res) => res.blob())
      .catch((error) => {
        console.error("Error converting video stream to blob: ", error);
      });

    const formData = new FormData();
    formData.append("video", videoBlob);

    axios
      .post("/api/process-video", formData)
      .then((response) => {
        // Handle response from backend API
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading video: ", error);
      });
  };

  return (
    <div className="video-recorder-container">
      <video ref={videoRef} className="video-recorder-video" />

      {!recording ? (
        <button className="video-recorder-button" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <>
          <div className="video-recorder-timer">Recording Time: {timer}s</div>
          <button className="video-recorder-button" onClick={stopRecording}>
            Stop Recording
          </button>
        </>
      )}
    </div>
  );
};

export default VideoRecorder;
