import React, { useState, useEffect } from 'react';
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
        console.log('score:', score)
        setScore(score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, [])


  
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
      score: {score}
      <CircleProgressBar percentage={score} />
      <p className={`severity ${severity.toLowerCase()}`}>{severity}</p>
    </div>
  );
};

export default ScorePage;