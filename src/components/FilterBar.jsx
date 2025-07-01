// src/components/FilterBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import logochico from '../assets/iconoch.png';

const FilterBar = ({ filters, onFilterChange, onApplyFilters, sortConfig, onSortChange }) => {
  const pokemonTypes = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", 
    "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

  // Nuevo manejador que combina el cambio con la aplicación inmediata
  const handleChange = (e) => {
    onFilterChange(e);
    onApplyFilters();
  };

  // Nuevo manejador para el ordenamiento en tiempo real
  const handleSortChange = (e) => {
    onSortChange(e);
    onApplyFilters();
  };

  return (
    <header className="filter-bar">
      <Link to="/" className="logo-link">
        <img src={logochico} alt="Regresar a inicio" />
      </Link>
      
      <div className="filters-container">
        {/* === FILTROS PRINCIPALES === */}
        <div className="main-filters">
          <input type="number" name="id" placeholder="ID del Pokémon" value={filters.id} onChange={handleChange} />
          <input type="text" name="nombre" placeholder="Nombre del Pokémon" value={filters.nombre} onChange={handleChange} />
          <select name="tipo" value={filters.tipo} onChange={handleChange}>
            <option value="">Cualquier Tipo</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* === FILTROS SECUNDARIOS (ESTADÍSTICAS) === */}
        <div className="range-filters">
          <input type="number" name="hp" placeholder="HP Mín." value={filters.hp} onChange={handleChange} />
          <input type="number" name="attack" placeholder="Ataque Mín." value={filters.attack} onChange={handleChange} />
          <input type="number" name="defense" placeholder="Defensa Mín." value={filters.defense} onChange={handleChange} />
          <input type="number" name="weight" placeholder="Peso Mín. (kg)" value={filters.weight} onChange={handleChange} />
          <input type="number" name="height" placeholder="Altura Mín. (m)" value={filters.height} onChange={handleChange} />
        </div>
      </div>

      {/* ===== CONTROLES DE ORDEN ===== */}
      <div className="sort-controls">
        <select name="key" value={sortConfig.key} onChange={handleSortChange}>
          <option value="id">Ordenar por ID</option>
          <option value="name">Ordenar A - Z</option>
          <option value="hp">Cantidad de HP</option>
          <option value="attack">Cantidad de Ataque</option>
          <option value="defense">Cantidad de Defensa</option>
        </select>
        <select name="direction" value={sortConfig.direction} onChange={handleSortChange}>
          <option value="ascending">Ascendente</option>
          <option value="descending">Descendente</option>
        </select>
      </div>
    </header>
  );
};

export default FilterBar;