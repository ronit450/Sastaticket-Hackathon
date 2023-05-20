import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
// import Contact from "./component/Login";
import MindGame from "./component/MindGame";
import VideoRecorder from "./component/VideoRecorder";
import ReactionTimeGame from "./component/ReactionTimeGame";
<<<<<<< HEAD
import Login from "./component/Login";
import Recommendation from "./component/Recommendation";
=======
// import Score from "./component/5";
import ScorePage from "./component/ScorePage";
import FatigueSlider from "./component/FatigueSlider";
import FatiguePage from "./component/FatigueSlider";
import SurveySlider from "./component/surveySlider";

>>>>>>> 4617c35fe91a1f528d3cd1fb1d14e2418393573a


const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/mindGame" element={<MindGame />} />
        <Route path="/recording" element={<VideoRecorder />} />
        <Route path="/reaction" element={<ReactionTimeGame />} />
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/recom" element={<Recommendation />} />
=======
        <Route path="/score" element={<ScorePage />} />
        <Route path="/survey" element={<FatiguePage />} />
        <Route path="/surveypage" element={<SurveySlider />} />

>>>>>>> 4617c35fe91a1f528d3cd1fb1d14e2418393573a
      </Routes>
    </Router>
  );
};

export default App;
