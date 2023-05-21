import React, { useState, useEffect } from "react";
import "./Score.css";
import CircleProgressBar from "./CircleProgressBar";
import axios from "axios";

const ScorePage = () => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/score");
        const { score } = response.data;
        console.log("score:", score);
        setScore(score);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    fetchScore();
  }, []);

  const getSeverity = () => {
    if (score < 30) {
      return "Low";
    } else if (score >= 30 && score <= 50) {
      return "Mild";
    } else if (score > 50 && score <= 80) {
      return "Moderate";
    } else if (score > 80) {
      return "High";
    }
  };

  const getRecommendation = () => {
    if (score < 30) {
      return [
        "Maintain a regular sleep schedule before traveling",
        "Stay hydrated by drinking plenty of water during the flight",
        "Adjust your sleep schedule gradually a few days before traveling, aligning it with the destinations time zone",
        "Avoid excessive consumption of caffeine and alcohol, as they can disrupt sleep patterns.",
      ];
    } else if (score >= 30 && score <= 50) {
      return [
        "Upon arrival, expose yourself to natural daylight, as it can help regulate your internal clock.",
        "Engage in light physical activity or exercise to promote alertness and combat fatigue. ",
        "Drink plenty of water before, during, and after your flight to stay hydrated. Avoid excessive caffeine and alcohol, as they can contribute to dehydration and disrupt your sleep patterns.",
        "Take short naps if needed, but avoid long and irregular sleep periods.",
      ];
    } else if (score > 50 && score <= 80) {
      return [
        "Consider adjusting your sleep schedule a few days before traveling to gradually align with the destination's time zone.",
        "Use sleep aids, such as eye masks or earplugs, to create a comfortable sleeping environment.",
        "Avoid heavy meals close to bedtime, as it can disrupt sleep patterns.",
        "Engage in regular physical activity during the day to stimulate circulation and promote wakefulness. Light exercise, such as walking or stretching, can help combat fatigue and improve your energy levels.",
      ];
    } else if (score > 80) {
      return [
        "Try to book flights that arrive at your destination during the daytime to align with the local schedule.",
        "Consider using prescribed medications or melatonin supplements to regulate sleep patterns.",
        "Give yourself ample time to adjust to the new time zone by arriving a day or two in advance.",
        "Consult with a healthcare professional for personalized advice and possible prescription options.",
      ];
    }
  };

  const severity = getSeverity();
  const recommendation = getRecommendation();

  return (
    <>
      <div className="recommendation-container">
        <CircleProgressBar percentage={score} />
        <p className="text-severity">
          Your Jetlag Severity is{" "}
          <span className={`severity ${severity.toLowerCase()}`}>{severity}</span>
        </p>

        <div className="recommendation">
          <h2>Recommendations</h2>
          <div className="techniques-list">
            {recommendation.map((recommendation, index) => (
              <div key={index} className="technique-item">
                <p>{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScorePage;
