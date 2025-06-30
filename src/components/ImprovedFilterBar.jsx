// src/components/ImprovedFilterBar.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp,
  Zap,
  Heart,
  Shield,
  Sword,
  Target,
  Wind,
  BarChart3,
  ArrowUpDown,
  RefreshCw,
  Sliders
} from 'lucide-react';
import './ImprovedFilterBar.css';

const POKEMON_TYPES = [
  { value: 'normal', label: 'Normal', color: '#A8A878', icon: '⚪' },
  { value: 'fire', label: 'Fire', color: '#F08030', icon: '🔥' },
  { value: 'water', label: 'Water', color: '#6890F0', icon: '💧' },
  { value: 'electric', label: 'Electric', color: '#F8D030', icon: '⚡' },
  { value: 'grass', label: 'Grass', color: '#78C850', icon: '🌿' },
  { value: 'ice', label: 'Ice', color: '#98D8D8', icon: '❄️' },
  { value: 'fighting', label: 'Fighting', color: '#C03028', icon: '👊' },
  { value: 'poison', label: 'Poison', color: '#A040A0', icon: '☠️' },
  { value: 'ground', label: 'Ground', color: '#E0C068', icon: '⛰️' },
  { value: 'flying', label: 'Flying', color: '#A890F0', icon: '🪶' },
  { value: 'psychic', label: 'Psychic', color: '#F85888', icon: '🔮' },
  { value: 'bug', label: 'Bug', color: '#A8B820', icon: '🐛' },
  { value: 'rock', label: 'Rock', color: '#B8A038', icon: '🗿' },
  { value: 'ghost', label: 'Ghost', color: '#705898', icon: '👻' },
  { value: 'dragon', label: 'Dragon', color: '#7038F8', icon: '🐉' },
  { value: 'dark', label: 'Dark', color: '#705848', icon: '🌚' },
  { value: 'steel', label: 'Steel', color: '#B8B8D0', icon: '⚙️' },
  { value: 'fairy', label: 'Fairy', color: '#EE99AC', icon: '🧚' },
];

const POKEMON_GENERATIONS = [
  { value: '1', label: 'Gen I - Kanto', range: [1, 151], icon: '🟢' },
  { value: '2', label: 'Gen II - Johto', range: [152, 251], icon: '🟡' },
  { value: '3', label: 'Gen III - Hoenn', range: [252, 386], icon: '🔵' },
  { value: '4', label: 'Gen IV - Sinnoh', range: [387, 493], icon: '🟣' },
  { value: '5', label: 'Gen V - Unova', range: [494, 649], icon: '⚫' },
  { value: '6', label: 'Gen VI - Kalos', range: [650, 721], icon: '🔴' },
  { value: '7', label: 'Gen VII - Alola', range: [722, 809], icon: '🟠' },
  { value: '8', label: 'Gen VIII - Galar', range: [810, 898], icon: '🟤' },
  { value: '9', label: 'Gen IX - Paldea', range: [899, 1050], icon: '🔶' },
];

const SORT_OPTIONS = [
  { value: 'id-asc', label: '📈 ID ↑', icon: <BarChart3 size={14} /> },
  { value: 'id-desc', label: '📉 ID ↓', icon: <BarChart3 size={14} /> },
  { value: 'name-asc', label: '🔤 A→Z', icon: <ArrowUpDown size={14} /> },
  { value: 'name-desc', label: '🔤 Z→A', icon: <ArrowUpDown size={14} /> },
];

const ImprovedFilterBar = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onResetFilters, 
  totalResults,
  loading 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [isSticky, setIsSticky] = useState(false);

  // Detectar scroll para hacer sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: state.isFocused ? '2px solid #3b82f6' : '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none',
      minHeight: '44px',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      borderRadius: '8px',
      border: '1px solid #bfdbfe',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1e40af',
      fontWeight: '600',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected 
        ? '#3b82f6' 
        : state.isFocused 
        ? '#eff6ff' 
        : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),
  };

  const typeOptions = POKEMON_TYPES.map(type => ({
    ...type,
    label: (
      <div className="type-option">
        <span className="type-emoji">{type.icon}</span>
        <span className="type-color" style={{ backgroundColor: type.color }}></span>
        <span>{type.label}</span>
      </div>
    ),
  }));

  const generationOptions = POKEMON_GENERATIONS.map(gen => ({
    ...gen,
    label: (
      <div className="generation-option">
        <span className="gen-icon">{gen.icon}</span>
        <span>{gen.label}</span>
        <span className="gen-range">({gen.range[0]}-{gen.range[1]})</span>
      </div>
    ),
  }));

  const handleQuickFilter = (type) => {
    onFilterChange({ target: { name: 'type', value: type } });
    onApplyFilters();
  };

  const handleQuickSort = (sortValue) => {
    onFilterChange({ target: { name: 'sortBy', value: sortValue } });
    onApplyFilters();
  };

  return (
    <motion.div 
      className={`improved-filter-bar ${isSticky ? 'sticky' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Barra principal: Búsqueda → Más filtros → Aplicar → Resetear */}
      <div className="main-filter-row">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            name="searchTerm"
            placeholder="Buscar por nombre o ID..."
            value={filters.searchTerm || ''}
            onChange={(e) => {
              onFilterChange(e);
              // Auto-search después de 300ms
              clearTimeout(window.searchTimeout);
              window.searchTimeout = setTimeout(() => {
                onApplyFilters();
              }, 300);
            }}
            className="search-input"
          />
          {filters.searchTerm && (
            <button
              onClick={() => {
                onFilterChange({ target: { name: 'searchTerm', value: '' } });
                onApplyFilters();
              }}
              className="clear-search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`more-filters-btn ${isExpanded ? 'active' : ''}`}
        >
          <Filter size={16} />
          <span>Más Filtros</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <button
          onClick={onApplyFilters}
          disabled={loading}
          className="apply-btn"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="spinning" />
              Aplicando...
            </>
          ) : (
            <>
              <Filter size={16} />
              Aplicar
            </>
          )}
        </button>

        <button
          onClick={() => {
            onResetFilters();
            onApplyFilters();
          }}
          className="reset-btn"
          disabled={loading}
        >
          <RefreshCw size={16} />
          Resetear
        </button>
      </div>

      {/* Mostrar resultados */}
      <div className="results-info">
        <span className="results-text">
          {totalResults} Pokémon encontrados
        </span>
      </div>

      {/* Panel expandible */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="expanded-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Tabs */}
            <div className="filter-tabs">
              {[
                { id: 'basic', label: 'Básico', icon: <Filter size={16} /> },
                { id: 'advanced', label: 'Avanzado', icon: <Sliders size={16} /> },
                { id: 'stats', label: 'Stats', icon: <BarChart3 size={16} /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Contenido de tabs */}
            <div className="tab-content">
              {activeTab === 'basic' && (
                <motion.div 
                  className="basic-filters"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="filter-row">
                    <div className="filter-group">
                      <label>Tipos</label>
                      <Select
                        isMulti
                        options={typeOptions}
                        value={typeOptions.filter(option => 
                          filters.types?.includes(option.value)
                        )}
                        onChange={(selected) => 
                          onFilterChange({ 
                            target: { 
                              name: 'types', 
                              value: selected?.map(s => s.value) || [] 
                            } 
                          })
                        }
                        styles={customSelectStyles}
                        placeholder="Seleccionar tipos..."
                        className="react-select"
                      />
                    </div>

                    <div className="filter-group">
                      <label>Generación</label>
                      <Select
                        options={generationOptions}
                        value={generationOptions.find(g => g.value === filters.generation)}
                        onChange={(selected) => 
                          onFilterChange({ 
                            target: { 
                              name: 'generation', 
                              value: selected?.value || '' 
                            } 
                          })
                        }
                        styles={customSelectStyles}
                        placeholder="Todas las generaciones"
                        isClearable
                        className="react-select"
                      />
                    </div>

                    <div className="filter-group">
                      <label>Ordenar por</label>
                      <Select
                        options={SORT_OPTIONS}
                        value={SORT_OPTIONS.find(s => s.value === filters.sortBy)}
                        onChange={(selected) => 
                          onFilterChange({ 
                            target: { 
                              name: 'sortBy', 
                              value: selected?.value || 'id-asc' 
                            } 
                          })
                        }
                        styles={customSelectStyles}
                        className="react-select"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'advanced' && (
                <motion.div 
                  className="advanced-filters"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="filter-row">
                    <div className="range-group">
                      <label>Altura (dm)</label>
                      <div className="range-inputs">
                        <input
                          type="number"
                          name="minHeight"
                          placeholder="Min"
                          value={filters.minHeight || ''}
                          onChange={onFilterChange}
                          className="range-input"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          name="maxHeight"
                          placeholder="Max"
                          value={filters.maxHeight || ''}
                          onChange={onFilterChange}
                          className="range-input"
                        />
                      </div>
                    </div>

                    <div className="range-group">
                      <label>Peso (hg)</label>
                      <div className="range-inputs">
                        <input
                          type="number"
                          name="minWeight"
                          placeholder="Min"
                          value={filters.minWeight || ''}
                          onChange={onFilterChange}
                          className="range-input"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          name="maxWeight"
                          placeholder="Max"
                          value={filters.maxWeight || ''}
                          onChange={onFilterChange}
                          className="range-input"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div 
                  className="stats-filters"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="stats-grid">
                    {[
                      { name: 'hp', label: 'HP', icon: <Heart size={16} />, color: '#ff5959' },
                      { name: 'attack', label: 'Attack', icon: <Sword size={16} />, color: '#f5ac78' },
                      { name: 'defense', label: 'Defense', icon: <Shield size={16} />, color: '#fae078' },
                      { name: 'speed', label: 'Speed', icon: <Wind size={16} />, color: '#fa92b2' },
                    ].map(stat => (
                      <div key={stat.name} className="stat-filter">
                        <label style={{ color: stat.color }}>
                          {stat.icon}
                          {stat.label}
                        </label>
                        <div className="stat-slider">
                          <input
                            type="range"
                            min="0"
                            max="255"
                            name={`min${stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}`}
                            value={filters[`min${stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}`] || 0}
                            onChange={onFilterChange}
                            className="slider"
                            style={{ '--stat-color': stat.color }}
                          />
                          <span className="stat-value">
                            {filters[`min${stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}`] || 0}+
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Botón aplicar filtros */}
            <div className="apply-section">
              <button
                onClick={onApplyFilters}
                disabled={loading}
                className="apply-btn"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="spinning" />
                    Aplicando...
                  </>
                ) : (
                  <>
                    <Filter size={18} />
                    Aplicar Filtros
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImprovedFilterBar;
