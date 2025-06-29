import React from 'react';

// Función para asignar colores según el tipo de Pokémon
const getTypeColor = (type) => {
    const colors = {
        fire: '#FFA07A', grass: '#98FB98', water: '#87CEEB',
        bug: '#B0E0A6', normal: '#D3D3D3', poison: '#EE82EE',
        electric: '#FFFF00', ground: '#F4A460', fairy: '#FFC0CB',
        fighting: '#FF6347', psychic: '#FFB6C1', rock: '#BDB76B',
        ghost: '#9370DB', ice: '#ADD8E6', dragon: '#6495ED',
        dark: '#A9A9A9', steel: '#C0C0C0', flying: '#E6E6FA'
    };
    return colors[type] || '#A8A878';
};


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
      <p>ID: #{pokemon.id.toString().padStart(3, '0')}</p>
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