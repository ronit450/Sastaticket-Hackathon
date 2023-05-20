import React, { useState } from 'react';
import './Score.css';
import CircleProgressBar from './CircleProgressBar';

const ScorePage = () => {
  const [score] = useState(84);
  const getSeverity = () => {
    if (score < 30) {
      return 'Low';
    } else if (score >= 30 && score <= 50) {
      return 'Mild';
    } else if (score > 50 && score <= 80) {
      return 'Moderate';
    } else if (score > 80) {
      return 'High';
    }
  };

  const severity = getSeverity();

  return (
    <div className="score-container">
      <CircleProgressBar percentage={score} />
      <p className={`severity ${severity.toLowerCase()}`}>{severity}</p>
    </div>
  );
};

export default ScorePage;
