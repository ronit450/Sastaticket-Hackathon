import React, { useEffect, useState } from 'react';
import './CircleProgressBar.css';

const CircleProgressBar = ({ percentage }) => {
  const [offset, setOffset] = useState(0);
  const radius = 90; // Adjust the radius accordingly
  const circumference = 2 * Math.PI * radius;
  const fillDuration = 2000; // Duration in milliseconds to fill the circle

  useEffect(() => {
    const progress = (100-percentage) / 100;
    const fillOffset = circumference - progress * circumference;

    let currentOffset = 0;
    let animationInterval;

    const animateFill = () => {
      currentOffset += increment;
      setOffset(currentOffset);

      if (currentOffset >= fillOffset) {
        clearInterval(animationInterval);
      }
    };

    const increment = fillOffset / (fillDuration / 20); // Adjust the interval to control the animation speed

    animationInterval = setInterval(animateFill, 20);

    return () => {
      clearInterval(animationInterval);
    };
  }, [percentage]);

  return (
    <div className="circle-progress-bar">
      <svg className="circle-progress" viewBox="0 0 200 200">
        <circle
          className="circle-progress-background"
          cx="100"
          cy="100"
          r={radius}
        />
        <circle
          className="circle-progress-fill"
          cx="100"
          cy="100"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text className="circle-progress-text" x="100" y="110">
          {Math.round(offset / circumference * 100)}%
        </text>
      </svg>
    </div>
  );
};

export default CircleProgressBar;
