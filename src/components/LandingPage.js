import React from 'react';
import { useNavigate } from 'react-router-dom';
import logopokemon from '../assets/logopokemon.png'; 

const LandingPage = () => {
  const navigate = useNavigate();

  const handleFindPokemon = () => {
    navigate('/finder');
  };

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        {/* IMPORTANTE: Coloca la URL de tu logo aquí */}
        <img src={logopokemon} alt="Logo de Pokémon" />
      </nav>
      <main className="center-content">
        <button className="find-pokemon-btn" onClick={handleFindPokemon}>
          Encontrar mi Pokémon
        </button>
      </main>
    </div>
  );
};

export default LandingPage;