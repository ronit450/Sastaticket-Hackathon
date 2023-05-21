import React, { useState } from "react";
import './survey.css';
import CircularSlider from '@fseehawer/react-circular-slider'
import axios from 'axios';

const SurveySlider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleSubmit = () => {
    // Handle the submit action here
    // You can use the sliderValue state to access the selected value
    console.log("Submitted:", sliderValue);
    uploadSurvey(sliderValue);
};

    const uploadSurvey = async (survey) => {
    try {
      await axios.post('http://127.0.0.1:5000/api/survey', { survey});
      console.log('Survey uploaded successfully!');
    } catch (error) {
      console.error('Survey uploading turns:', error);
    }
  };

  return (
    <div className="App">
      <h2 className="question">Please rate your tiredness on a scale of 0-10</h2>
      <div className="slider-container">
        <CircularSlider
          width={200}
          height={200}
          label='Fatigue Rate'
          min={0}
          max={10}
          onChange={handleSliderChange}
        />
        <p>Slider Value: {sliderValue}</p>
        <button onClick={handleSubmit} className="submit-btn">Submit</button>

      </div>
    </div>
  );
}

export default SurveySlider;
