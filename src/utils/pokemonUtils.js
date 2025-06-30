import { GENERATION_MAP, TYPE_COLORS } from '../constants/pokemonConstants';

/**
 * Obtiene la generación de un Pokémon por su ID
 * @param {number} id - ID del Pokémon
 * @returns {string} - Nombre de la generación
 */
export const getGenerationById = (id) => {
  for (const gen of GENERATION_MAP) {
    if (id <= gen.limit) return gen.name;
  }
  return 'Desconocida';
};

/**
 * Obtiene el color asociado a un tipo de Pokémon
 * @param {string} type - Tipo del Pokémon
 * @returns {string} - Color en formato hexadecimal
 */
export const getTypeColor = (type) => {
  return TYPE_COLORS[type] || '#A8A878';
};

/**
 * Formatea el ID del Pokémon con ceros a la izquierda
 * @param {number} id - ID del Pokémon
 * @returns {string} - ID formateado (ej: 001, 025, 150)
 */
export const formatPokemonId = (id) => {
  return id.toString().padStart(3, '0');
};

/**
 * Convierte decagramos a kilogramos
 * @param {number} weight - Peso en decagramos
 * @returns {number} - Peso en kilogramos
 */
export const formatWeight = (weight) => {
  return (weight / 10).toFixed(1);
};

/**
 * Convierte decímetros a metros
 * @param {number} height - Altura en decímetros
 * @returns {number} - Altura en metros
 */
export const formatHeight = (height) => {
  return (height / 10).toFixed(1);
};

/**
 * Obtiene la estadística específica de un Pokémon
 * @param {Array} stats - Array de estadísticas del Pokémon
 * @param {string} statName - Nombre de la estadística
 * @returns {number} - Valor de la estadística
 */
export const getStatValue = (stats, statName) => {
  const stat = stats.find(s => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
};

/**
 * Valida si un valor es numérico válido
 * @param {string} value - Valor a validar
 * @returns {boolean} - True si es válido
 */
export const isValidNumeric = (value) => {
  const regex = /^\d*\.?\d*$/;
  return regex.test(value);
};

/**
 * Debounce function para optimizar búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Delay en milisegundos
 * @returns {Function} - Función debounced
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Ordena un array de Pokémon según la configuración especificada
 * @param {Array} pokemons - Array de Pokémon
 * @param {Object} sortConfig - Configuración de ordenamiento
 * @returns {Array} - Array ordenado
 */
export const sortPokemons = (pokemons, sortConfig) => {
  return [...pokemons].sort((a, b) => {
    let valA, valB;
    
    // Asigna los valores a comparar según la clave de orden
    if (['hp', 'attack', 'defense'].includes(sortConfig.key)) {
      valA = getStatValue(a.stats, sortConfig.key);
      valB = getStatValue(b.stats, sortConfig.key);
    } else if (sortConfig.key === 'name') {
      valA = a.name;
      valB = b.name;
    } else { // por defecto, ordena por ID
      valA = a.id;
      valB = b.id;
    }
    
    // Realiza la comparación
    if (valA < valB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (valA > valB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Aplica filtros a un array de Pokémon
 * @param {Array} pokemons - Array de Pokémon
 * @param {Object} filters - Objeto con los filtros
 * @returns {Array} - Array filtrado
 */
export const applyFilters = (pokemons, filters) => {
  return pokemons.filter(pokemon => {
    // Filtro por ID
    if (filters.id && pokemon.id.toString() !== filters.id) {
      return false;
    }
    
    // Filtro por nombre
    if (filters.nombre && !pokemon.name.toLowerCase().includes(filters.nombre.toLowerCase())) {
      return false;
    }
    
    // Filtro por generación
    if (filters.generacion && pokemon.generation !== filters.generacion) {
      return false;
    }
    
    // Filtro por tipo
    if (filters.tipo && !pokemon.types.some(typeInfo => typeInfo.type.name === filters.tipo)) {
      return false;
    }
    
    // Filtros por estadísticas
    const statFilters = { hp: 'hp', attack: 'attack', defense: 'defense' };
    for (const [key, statName] of Object.entries(statFilters)) {
      if (filters[key] && getStatValue(pokemon.stats, statName) < parseFloat(filters[key])) {
        return false;
      }
    }
    
    // Filtro por peso
    if (filters.weight && formatWeight(pokemon.weight) < parseFloat(filters.weight)) {
      return false;
    }
    
    // Filtro por altura
    if (filters.height && formatHeight(pokemon.height) < parseFloat(filters.height)) {
      return false;
    }
    
    return true;
  });
};
