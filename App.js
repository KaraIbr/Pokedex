import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PokemonFinder from './components/PokemonFinder';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/finder" element={<PokemonFinder />} />
      </Routes>
    </Router>
  );
}

export default App;