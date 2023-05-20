import React from "react";
import img2 from "../assets/img2.jpg";
import video from "../assets/video.mp4";
import "./Home.scss";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      {/* <div>
        <img src={img2} alt="img" className="image" />
      </div> */}

      {/* <Navbar /> */}
      <div className="container">
        {/* <h1 className="title">
          ChronoCheck: Accurate Jetlag Monitoring Made Simple
        </h1> */}
        <div className="video-container">
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};
export default Home;
