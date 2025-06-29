// src/components/PokemonModal.js

import React from 'react';

const PokemonModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  // Función para obtener una estadística por su nombre
  const getStat = (name) => {
    const stat = pokemon.stats.find(statInfo => statInfo.stat.name === name);
    return stat ? stat.base_stat : 'N/A';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>X</button>
        
        {/* ---- SECCIÓN SUPERIOR: IMAGEN Y TÍTULO ---- */}
        <div className="modal-header">
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
          <h2>{pokemon.name} - #{pokemon.id.toString().padStart(3, '0')}</h2>
        </div>

        {/* ---- SECCIÓN INFERIOR: DOS COLUMNAS ---- */}
        <div className="modal-body">
          {/* COLUMNA IZQUIERDA */}
          <div className="modal-column">
            <h4>Estadísticas Base</h4>
            <p><strong>HP:</strong> {getStat('hp')}</p>
            <p><strong>Ataque:</strong> {getStat('attack')}</p>
            <p><strong>Defensa:</strong> {getStat('defense')}</p>
            <p><strong>Ataque Especial:</strong> {getStat('special-attack')}</p>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="modal-column">
            <h4>Más Detalles</h4>
            <p><strong>Velocidad:</strong> {getStat('speed')}</p>
            <div>
              <strong>Habilidades:</strong>
              <p>{pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
            </div>
            <div>
              <strong>Información Adicional:</strong>
              <p>Altura: {pokemon.height / 10} m</p>
              <p>Peso: {pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;