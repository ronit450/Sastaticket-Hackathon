import React, { useState } from "react";
import "./CircularSlider.css"; // Custom CSS for styling

const CircularSlider = () => {
  const [rotation, setRotation] = useState(0);

  const handleRotationChange = (event) => {
    const angle = parseInt(event.target.value, 10);
    setRotation(angle);
  };

  return (
    <div className="circular-slider-container">
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={handleRotationChange}
        className="circular-slider"
      />
      <div
        className="circular-slider-indicator"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {rotation}
      </div>
    </div>
  );
};

export default CircularSlider;
