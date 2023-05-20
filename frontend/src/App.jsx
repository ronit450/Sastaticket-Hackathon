import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Login";
import MindGame from "./component/MindGame";
import VideoRecorder from "./component/VideoRecorder";

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
      </Routes>
    </Router>
  );
};

export default App;
