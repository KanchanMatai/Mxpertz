import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../src/MainPage.js';
import StoryDetailPage from '../src/storyDetailPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/storyDetailPage/:id" element={<StoryDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
