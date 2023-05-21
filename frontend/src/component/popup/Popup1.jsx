import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Import the CSS file for styling
// import "./navbar.css";

const Popup1 = () => {
  return (
    <div className="terms-container">
      <div className="terms-text">
        <h1>Mind Game</h1>
        <p>
          Welcome to our professional air ticket service website! We strive to
          provide you with excellent services and enhance your travel
          experience. Before using our website and its features, please
          carefully review the following terms and conditions that govern your
          use. By using our website, you agree to be bound by these terms and
          conditions. If you do not agree with any part of these terms and
          conditions, please refrain from using our website. General
        </p>
      </div>

      <Link to="/mindGame" className="accept-link">
        Lets Play
      </Link>
    </div>
  );
};

export default Popup1;
