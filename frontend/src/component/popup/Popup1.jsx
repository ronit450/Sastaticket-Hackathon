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
        At the start, all the cards will be shown face up, allowing you to see their contents.
        You need to flip two cards at a time, attempting to find pairs that have the same sides.
        To flip a card, simply click or tap on it to expose its side.
        Each time you flip two cards, it counts as one turn.
        Continue flipping pairs of cards and trying to match them until all pairs have been successfully matched.
        </p>
      </div>

      <Link to="/mindGame" className="accept-link">
        Lets Play
      </Link>
    </div>
  );
};

export default Popup1;
