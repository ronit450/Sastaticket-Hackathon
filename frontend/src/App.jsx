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
      </Routes>
    </Router>
  );
};

export default App;
