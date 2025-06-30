import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp,
  Zap,  
  BarChart3,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';
import { 
  POKEMON_TYPES, 
  GENERATION_MAP, 
  TYPE_COLORS,
  SORT_OPTIONS,
  SORT_DIRECTIONS 
} from '../constants/pokemonConstants';
import logochico from '../assets/iconoch.png';
import './FilterBar.css';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onResetFilters,
  sortConfig, 
  onSortChange,
  totalResults = 0,
  loading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  // Opciones para react-select
  const typeOptions = POKEMON_TYPES.map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: TYPE_COLORS[type] || '#68D391'
  }));

  const generationOptions = GENERATION_MAP.map(gen => ({
    value: gen.name,
    label: gen.displayName
  }));

  const sortOptions = SORT_OPTIONS.map(option => ({
    value: option.key,
    label: option.label
  }));

  const sortDirectionOptions = SORT_DIRECTIONS.map(direction => ({
    value: direction.key,
    label: direction.label
  }));

  // Estilos personalizados para react-select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
      minHeight: '44px',
      borderRadius: '12px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#3b82f6' 
        : state.isFocused 
        ? '#eff6ff' 
        : 'white',
      color: state.isSelected ? 'white' : '#374151',
    }),
  };

  // Función para manejar cambios en select
  const handleSelectChange = (name, selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    onFilterChange({ target: { name, value } });
  };

  const handleSortSelectChange = (name, selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    onSortChange({ target: { name, value } });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== '');
  };

  return (
    <motion.header 
      className="enhanced-filter-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Principal */}
      <div className="filter-header">
        <Link to="/" className="logo-link">
          <motion.img 
            src={logochico} 
            alt="Regresar a inicio"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          />
        </Link>
        
        {/* Búsqueda Principal */}
        <div className="main-search">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              name="nombre"
              placeholder="Buscar Pokémon por nombre..."
              value={filters.nombre}
              onChange={onFilterChange}
              className="search-input"
            />
            {filters.nombre && (
              <button
                onClick={() => onFilterChange({ target: { name: 'nombre', value: '' } })}
                className="clear-search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={filters.id}
            onChange={onFilterChange}
            className="id-input"
            min="1"
            max="1025"
          />
        </div>

        {/* Controles de Acción */}
        <div className="header-actions">
          <div className="results-badge">
            <BarChart3 size={16} />
            <span>{totalResults}</span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`expand-btn ${isExpanded ? 'active' : ''}`}
          >
            <Filter size={18} />
            <span>Filtros</span>
            {hasActiveFilters() && <div className="filter-indicator" />}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Panel de Filtros Expandible */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Navegación de Secciones */}
            <div className="filter-nav">
              {[
                { id: 'basic', label: 'Básico', icon: Filter },
                { id: 'stats', label: 'Estadísticas', icon: Zap },
                { id: 'sort', label: 'Ordenar', icon: ArrowUpDown },
              ].map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                );
              })}
            </div>

            {/* Contenido de Secciones */}
            <div className="filter-content">
              {/* Sección Básica */}
              {activeSection === 'basic' && (
                <motion.div 
                  className="filter-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="filter-grid">
                    <div className="filter-group">
                      <label>Tipo</label>
                      <Select
                        options={typeOptions}
                        value={typeOptions.find(option => option.value === filters.tipo)}
                        onChange={(selected) => handleSelectChange('tipo', selected)}
                        styles={customSelectStyles}
                        placeholder="Seleccionar tipo..."
                        isClearable
                        formatOptionLabel={(option) => (
                          <div className="type-option">
                            <div 
                              className="type-color" 
                              style={{ backgroundColor: option.color }}
                            />
                            {option.label}
                          </div>
                        )}
                      />
                    </div>

                    <div className="filter-group">
                      <label>Generación</label>
                      <Select
                        options={generationOptions}
                        value={generationOptions.find(option => option.value === filters.generacion)}
                        onChange={(selected) => handleSelectChange('generacion', selected)}
                        styles={customSelectStyles}
                        placeholder="Seleccionar generación..."
                        isClearable
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Sección Estadísticas */}
              {activeSection === 'stats' && (
                <motion.div 
                  className="filter-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stats-grid">
                    {[
                      { name: 'hp', label: 'HP', color: '#FF5959' },
                      { name: 'attack', label: 'Ataque', color: '#F5AC78' },
                      { name: 'defense', label: 'Defensa', color: '#FAE078' },
                      { name: 'weight', label: 'Peso (kg)', color: '#9DB7F5' },
                      { name: 'height', label: 'Altura (m)', color: '#A7DB8D' },
                    ].map(stat => (
                      <div key={stat.name} className="stat-input-group">
                        <label style={{ color: stat.color }}>
                          {stat.label} mínimo
                        </label>
                        <input
                          type="number"
                          name={stat.name}
                          placeholder={`${stat.label} mín.`}
                          value={filters[stat.name]}
                          onChange={onFilterChange}
                          className="stat-input"
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Sección Ordenar */}
              {activeSection === 'sort' && (
                <motion.div 
                  className="filter-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="sort-grid">
                    <div className="filter-group">
                      <label>Ordenar por</label>
                      <Select
                        options={sortOptions}
                        value={sortOptions.find(option => option.value === sortConfig.key)}
                        onChange={(selected) => handleSortSelectChange('key', selected)}
                        styles={customSelectStyles}
                        placeholder="Seleccionar criterio..."
                      />
                    </div>

                    <div className="filter-group">
                      <label>Dirección</label>
                      <Select
                        options={sortDirectionOptions}
                        value={sortDirectionOptions.find(option => option.value === sortConfig.direction)}
                        onChange={(selected) => handleSortSelectChange('direction', selected)}
                        styles={customSelectStyles}
                        placeholder="Seleccionar dirección..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Acciones de Filtros */}
            <div className="filter-actions">
              <button 
                className="reset-btn" 
                onClick={onResetFilters}
                disabled={loading}
              >
                <RefreshCw size={16} />
                Limpiar Filtros
              </button>
              
              <button 
                className="apply-btn" 
                onClick={onApplyFilters}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={16} />
                    </motion.div>
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    Buscar Pokémon
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default FilterBar;