import React, { useState } from "react";
import "./survey.css";
import CircularSlider from "@fseehawer/react-circular-slider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

const SurveySlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Start loading

      console.log("Submitted:", sliderValue);
      await uploadSurvey(sliderValue); // Wait for the survey upload

      const timer = setTimeout(() => {
        navigate("/score");
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const uploadSurvey = async (survey) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/survey", { survey });
      console.log("Survey uploaded successfully!");
    } catch (error) {
      console.error("Survey uploading error:", error);
    }
  };

  return (
    <div className="App">
      <h2 className="question">Please rate your tiredness on a scale of 0-10</h2>
      <div className="slider-container">
        <CircularSlider
          width={200}
          height={200}
          label="Fatigue Rate"
          min={0}
          max={10}
          onChange={handleSliderChange}
        />
        <p>Slider Value: {sliderValue}</p>
        {isLoading ? (
          <Loader />
        ) : (
          <button onClick={handleSubmit} className="submit-btn">
            Calculate my JetLag
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveySlider;
