// Recommendation.js

import React from "react";
import "./Recommendation.css"; // Import the CSS file for styling

const Recommendation = () => {
  // Mock sleep optimization techniques data
  const techniques = [
    {
      title: "Create a Relaxing Bedtime Routine",
      description:
        "Establish a consistent routine before bed to signal to your body that it is time to sleep.",
    },
    {
      title: "Ensure a Comfortable Sleep Environment",
      description:
        "Create a dark, quiet, and cool sleep environment for optimal sleep quality.",
    },
    {
      title: "Limit Screen Time Before Bed",
      description:
        "Avoid exposure to electronic screens for at least an hour before bedtime.",
    },
    {
      title: "Practice Relaxation Techniques",
      description:
        "Engage in relaxation exercises like deep breathing or meditation to promote better sleep.",
    },
  ];

  return (
    <div className="recommendation-container">
      <h2>Recommendations</h2>
      <div className="techniques-list">
        {techniques.map((technique, index) => (
          <div className="technique-item" key={index}>
            <h3>{technique.title}</h3>
            <p>{technique.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
