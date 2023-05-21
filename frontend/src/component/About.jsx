import React from "react";
import "./about.css";

import img2 from "../assets/img2.jpg";

const AboutPage = () => {
  return (
    <section className="aboutt">
      <div className="main">
        <img src={img2} alt="img" />
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            ChronoCheck is a web application that helps you monitor your jetlag
            and provides you with recommendations to help you adjust to your new
            time zone. ChronoCheck uses a machine learning model to analyze your
            behavior and calculate your jetlag. The model is trained using data
            collected from users who have traveled across different time zones.
            The data is collected using the webcam and microphone on your
            device. The model analyzes your behavior and calculates your jetlag
            based on the following factors: sleep quality, reaction time, and
            speech. The model also provides you with recommendations to help you
            adjust to your new time zone.
          </p>
          <button>Read More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
