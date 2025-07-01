import { TYPE_COLORS } from '../constants/pokemonConstants';

/**
 * Obtiene la generación de un Pokémon por su ID
 * @param {number} id - ID del Pokémon
 * @returns {string} - Nombre de la generación
 */
export const getGenerationById = (id) => {
  // Lógica simplificada de generaciones
  if (id <= 151) return 'generation-i';
  if (id <= 251) return 'generation-ii';
  if (id <= 386) return 'generation-iii';
  if (id <= 493) return 'generation-iv';
  if (id <= 649) return 'generation-v';
  if (id <= 721) return 'generation-vi';
  if (id <= 809) return 'generation-vii';
  if (id <= 905) return 'generation-viii';
  if (id <= 1025) return 'generation-ix';
  return 'unknown';
};

/**
 * Obtiene el color asociado a un tipo de Pokémon
 * @param {string} type - Tipo del Pokémon
 * @returns {string} - Color en formato hexadecimal
 */
export const getTypeColor = (type) => {
  if (!type || typeof type !== 'string') return '#A8A878'; // Default gray color
  const normalizedType = type.toLowerCase();
  return TYPE_COLORS[normalizedType] || '#A8A878';
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
 * Ordena un array de Pokémon según la configuración especificada
 * @param {Array} pokemons - Array de Pokémon
 * @param {Object} sortConfig - Configuración de ordenamiento
 * @returns {Array} - Array ordenado
 */
export const sortPokemons = (pokemons, sortConfig) => {
  return [...pokemons].sort((a, b) => {
    let valA, valB;
    
    if (['hp', 'attack', 'defense'].includes(sortConfig.key)) {
      valA = getStatValue(a.stats, sortConfig.key);
      valB = getStatValue(b.stats, sortConfig.key);
    } else if (sortConfig.key === 'name') {
      valA = a.name;
      valB = b.name;
    } else {
      valA = a.id;
      valB = b.id;
    }
    
    return sortConfig.direction === 'ascending' 
      ? valA > valB ? 1 : -1
      : valA < valB ? 1 : -1;
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
    if (filters.tipo && !pokemon.types.some(t => t.type.name === filters.tipo)) {
      return false;
    }
    
    // Filtros por estadísticas
    if (filters.hp && getStatValue(pokemon.stats, 'hp') < Number(filters.hp)) {
      return false;
    }
    if (filters.attack && getStatValue(pokemon.stats, 'attack') < Number(filters.attack)) {
      return false;
    }
    if (filters.defense && getStatValue(pokemon.stats, 'defense') < Number(filters.defense)) {
      return false;
    }
    
    // Filtros por medidas
    if (filters.weight && formatWeight(pokemon.weight) < Number(filters.weight)) {
      return false;
    }
    if (filters.height && formatHeight(pokemon.height) < Number(filters.height)) {
      return false;
    }
    
    return true;
  });
};
