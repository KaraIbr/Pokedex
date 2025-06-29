// src/components/FilterBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import logochico from '../assets/iconoch.png';

const FilterBar = ({ filters, onFilterChange, onApplyFilters, sortConfig, onSortChange }) => {
  const pokemonTypes = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", 
    "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

  return (
    <header className="filter-bar">
      <Link to="/" className="logo-link">
        <img src={logochico} alt="Regresar a inicio" />
      </Link>
      
      <div className="filters-container">
        {/* === FILTROS PRINCIPALES === */}
        <div className="main-filters">
          <input type="number" name="id" placeholder="ID del Pokémon" value={filters.id} onChange={onFilterChange} />
          <input type="text" name="nombre" placeholder="Nombre del Pokémon" value={filters.nombre} onChange={onFilterChange} />
          <select name="generacion" value={filters.generacion} onChange={onFilterChange}>
            <option value="">Cualquier Generación</option>
            <option value="I">Generación I</option>
            <option value="II">Generación II</option>
            <option value="III">Generación III</option>
            <option value="IV">Generación IV</option>
            <option value="V">Generación V</option>
            <option value="VI">Generación VI</option>
            <option value="VII">Generación VII</option>
            <option value="VIII">Generación VIII</option>
            <option value="IX">Generación IX</option>
          </select>
          <select name="tipo" value={filters.tipo} onChange={onFilterChange}>
            <option value="">Cualquier Tipo</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* === FILTROS SECUNDARIOS (ESTADÍSTICAS) === */}
        <div className="range-filters">
          <input type="number" name="hp" placeholder="HP Mín." value={filters.hp} onChange={onFilterChange} />
          <input type="number" name="attack" placeholder="Ataque Mín." value={filters.attack} onChange={onFilterChange} />
          <input type="number" name="defense" placeholder="Defensa Mín." value={filters.defense} onChange={onFilterChange} />
          <input type="number" name="weight" placeholder="Peso Mín. (kg)" value={filters.weight} onChange={onFilterChange} />
          <input type="number" name="height" placeholder="Altura Mín. (m)" value={filters.height} onChange={onFilterChange} />
        </div>
      </div>

      {/* ===== NUEVOS CONTROLES DE ORDEN ===== */}
      <div className="sort-controls">
        <select name="key" value={sortConfig.key} onChange={onSortChange}>
          <option value="id">Ordenar por ID</option>
          <option value="name">Ordenar A - Z</option>
          <option value="hp">Cantidad de HP</option>
          <option value="attack">Cantidad de Ataque</option>
          <option value="defense">Cantidad de Defensa</option>
        </select>
        <select name="direction" value={sortConfig.direction} onChange={onSortChange}>
          <option value="ascending">Ascendente</option>
          <option value="descending">Descendente</option>
        </select>
      </div>

      <button className="consultar-btn" onClick={onApplyFilters}>
        Consultar
      </button>
    </header>
  );
};

export default FilterBar;