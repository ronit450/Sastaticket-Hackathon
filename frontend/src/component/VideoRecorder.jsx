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
          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9',
            videoBitsPerSecond: 2500000,
          });

          let recordedChunks = [];

          // Store recorded data chunks
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };

          // When recording stops, save the recorded file
          mediaRecorderRef.current.onstop = () => {
            const fullBlob = new Blob(recordedChunks, { type: 'video/webm' });
            uploadVideo(fullBlob); // Pass the fullBlob to the uploadVideo function
            recordedChunks = [];
          };

          // Start recording
          mediaRecorderRef.current.start();
        })
        .catch((error) => {
          console.error('Error accessing camera: ', error);
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

  const uploadVideo = async (blob) => {
    const formData = new FormData();
    formData.append('video', blob);

    try {
      await axios.post('http://127.0.0.1:5000/api/upload', formData);
      console.log('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
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
