import React from 'react';
import { getTypeColor, formatPokemonId } from '../utils/pokemonUtils';


const PokemonCard = ({ pokemon, onCardClick }) => {
  if (!pokemon) return null;

  return (
    <div className="pokemon-card" onClick={() => onCardClick(pokemon)}>
      <img 
        // La API provee imágenes, usamos la oficial. Si no, mostramos un placeholder.
        src={pokemon.sprites.other['official-artwork'].front_default || './Images/errorimgf.jpg'} 
        alt={pokemon.name} 
      />
      <h3>{pokemon.name}</h3>
      <p>ID: #{formatPokemonId(pokemon.id)}</p>
      <div>
        {pokemon.types.map(typeInfo => (
          <span 
            key={typeInfo.type.name} 
            className="pokemon-type"
            style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
      <p>Generación: {pokemon.generation}</p>
    </div>
  );
};

export default PokemonCard;