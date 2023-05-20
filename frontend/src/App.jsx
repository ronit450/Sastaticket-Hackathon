import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Login";
import MindGame from "./component/MindGame";
import VideoRecorder from "./component/VideoRecorder";
import ReactionTimeGame from "./component/ReactionTimeGame";
// import Score from "./component/5";
import ScorePage from "./component/ScorePage";
import FatigueSlider from "./component/FatigueSlider";
import FatiguePage from "./component/FatigueSlider";
import SurveySlider from "./component/surveySlider";



const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mindGame" element={<MindGame />} />
        <Route path="/recording" element={<VideoRecorder />} />
        <Route path="/reaction" element={<ReactionTimeGame />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/survey" element={<FatiguePage />} />
        <Route path="/surveypage" element={<SurveySlider />} />

      </Routes>
    </Router>
  );
};

export default App;
