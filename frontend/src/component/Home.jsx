import React from "react";
import img2 from "../assets/img2.jpg";
import video from "../assets/video.mp4";
import video2 from "../assets/video-2.mp4";
import video4 from "../assets/video-4.mp4";
import "./Home.scss";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import airplaneImage from "../assets/takeoff.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="video-container">
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className="title-container">
            <h1 className="title">ChronoCheck</h1>
            <img className="airplane-image" src={airplaneImage} alt="Airplane" />
          </div>
          <h2 className="subtitle">Accurate Jetlag Monitoring Made Simple</h2>
          <Link to="/login" className="play-button">
            Play Game
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
