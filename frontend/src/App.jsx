import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
// import Contact from "./component/Login";
import MindGame from "./component/MindGame";
import VideoRecorder from "./component/VideoRecorder";
import ReactionTimeGame from "./component/ReactionTimeGame";
import Login from "./component/Login";
import Recommendation from "./component/Recommendation";
// import Score from "./component/5";
import ScorePage from "./component/ScorePage";

import SurveySlider from "./component/surveySlider";
import AboutPage from "./component/About";
import Popup1 from "./component/popup/Popup1";
import Popup2 from "./component/popup/Popup2";

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
        <Route path="/login" element={<Login />} />
        <Route path="/recom" element={<Recommendation />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/surveypage" element={<SurveySlider />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/popup1" element={<Popup1 />} />
        <Route path="/popup2" element={<Popup2 />} />

      </Routes>
    </Router>
  );
};

export default App;
