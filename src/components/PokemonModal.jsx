import React from 'react';
import { getStatValue, formatWeight, formatHeight, formatPokemonId } from '../utils/pokemonUtils';

const PokemonModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>X</button>
        
        {/* ---- SECCIÓN SUPERIOR: IMAGEN Y TÍTULO ---- */}
        <div className="modal-header">
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
          <h2>{pokemon.name} - #{formatPokemonId(pokemon.id)}</h2>
        </div>

        {/* ---- SECCIÓN INFERIOR: DOS COLUMNAS ---- */}
        <div className="modal-body">
          {/* COLUMNA IZQUIERDA */}
          <div className="modal-column">
            <h4>Estadísticas Base</h4>
            <p><strong>HP:</strong> {getStatValue(pokemon.stats, 'hp')}</p>
            <p><strong>Ataque:</strong> {getStatValue(pokemon.stats, 'attack')}</p>
            <p><strong>Defensa:</strong> {getStatValue(pokemon.stats, 'defense')}</p>
            <p><strong>Ataque Especial:</strong> {getStatValue(pokemon.stats, 'special-attack')}</p>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="modal-column">
            <h4>Más Detalles</h4>
            <p><strong>Velocidad:</strong> {getStatValue(pokemon.stats, 'speed')}</p>
            <div>
              <strong>Habilidades:</strong>
              <p>{pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
            </div>
            <div>
              <strong>Información Adicional:</strong>
              <p>Altura: {formatHeight(pokemon.height)} m</p>
              <p>Peso: {formatWeight(pokemon.weight)} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;