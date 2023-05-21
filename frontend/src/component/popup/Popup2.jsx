import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Import the CSS file for styling
// import "./navbar.css";

const Popup2 = () => {
  return (
    <div className="terms-container">
      <div className="terms-text">
        <h1>Reaction Game</h1>
        <p>
        The game consists of a 3x3 grid with multiple blocks.
        Each block within the grid will change color and become red at regular intervals.
        Your task is to quickly identify the red block and click on it as soon as possible.
        After every two seconds, another block within the grid will turn red, and you must respond promptly by clicking on it.
        This pattern will continue for a duration of thirty seconds.
        </p>
      </div>

      <Link to="/reaction" className="accept-link">
        Lets Play
      </Link>
    </div>
  );
};

export default Popup2;
