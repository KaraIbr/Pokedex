// src/App.js

import React from 'react';
// 1. Asegúrate de que estas importaciones estén aquí
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PokemonFinder from './components/PokemonFinder';
import './App.css';

function App() {
  return (
    // 2. Este debe ser el contenido de tu componente App
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/finder" element={<PokemonFinder />} />
      </Routes>
    </Router>
  );
}

export default App;