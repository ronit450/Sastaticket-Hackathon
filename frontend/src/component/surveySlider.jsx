import React, { useState } from "react";
import './survey.css';
import CircularSlider from '@fseehawer/react-circular-slider'

const SurveySlider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <div className="App">
      <CircularSlider
        width={200}
        height={200}
        label='Fatigue Rate'
        min={0}
        max={10}
        onChange={handleSliderChange}
      />
      <p>Slider Value: {sliderValue}</p>
    </div>
  );
}

export default SurveySlider;
