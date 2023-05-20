import React, { useState, useEffect } from "react";
import './Score.css';
import CircleProgressBar from './CircleProgressBar';
import axios from 'axios';

const ScorePage = () => {
  const [score, setScore] = useState(null);
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/score');
        const { score } = response.data;
        console.log('Score:', score)
        setScore(score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, []);


 
  const [severity, setSeverity] = useState('');

  // Set the severity based on the score
  if (score < 30) {
    setSeverity('Low');
  } else if (score >= 30 && score <= 50) {
    setSeverity('Mild');
  } else if (score > 50 && score <= 80) {
    setSeverity('Moderate');
  } else if (score > 80) {
    setSeverity('High');
  }

  return (
    <div className="score-container">
      <CircleProgressBar percentage={score} />
      {/* <p className={`severity ${severity.toLowerCase()}`}>{severity}</p> */}
    </div>
);



    
};

export default ScorePage;
