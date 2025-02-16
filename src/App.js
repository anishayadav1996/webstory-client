// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStory from "./webstory/Addstory";
import StoryList from "./webstory/StoryList";
import StoryDetail from "./webstory/StoryDetails";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<AddStory />} />
      <Route path="/story" element={<StoryList />} />
      <Route path="/story/:id" element={<StoryDetail />} />
    </Routes>
  </Router>
  );
}

export default App;
