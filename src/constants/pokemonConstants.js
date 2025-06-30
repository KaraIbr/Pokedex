// Configuración de paginación
export const PAGINATION = {
  POKEMONS_PER_PAGE: 30,
  MAX_POKEMON_ID: 1025,
};

// Mapeo de generaciones
export const GENERATION_MAP = [
  { limit: 151, name: 'I', displayName: 'Generación I (Kanto)' },
  { limit: 251, name: 'II', displayName: 'Generación II (Johto)' },
  { limit: 386, name: 'III', displayName: 'Generación III (Hoenn)' },
  { limit: 493, name: 'IV', displayName: 'Generación IV (Sinnoh)' },
  { limit: 649, name: 'V', displayName: 'Generación V (Unova)' },
  { limit: 721, name: 'VI', displayName: 'Generación VI (Kalos)' },
  { limit: 809, name: 'VII', displayName: 'Generación VII (Alola)' },
  { limit: 905, name: 'VIII', displayName: 'Generación VIII (Galar)' },
  { limit: 1025, name: 'IX', displayName: 'Generación IX (Paldea)' }
];

// Colores de tipos de Pokémon
export const TYPE_COLORS = {
  fire: '#FFA07A',
  grass: '#98FB98',
  water: '#87CEEB',
  bug: '#B0E0A6',
  normal: '#D3D3D3',
  poison: '#EE82EE',
  electric: '#FFFF00',
  ground: '#F4A460',
  fairy: '#FFC0CB',
  fighting: '#FF6347',
  psychic: '#FFB6C1',
  rock: '#BDB76B',
  ghost: '#9370DB',
  ice: '#ADD8E6',
  dragon: '#6495ED',
  dark: '#A9A9A9',
  steel: '#C0C0C0',
  flying: '#E6E6FA'
};

// Tipos de Pokémon disponibles
export const POKEMON_TYPES = [
  'fire', 'grass', 'water', 'bug', 'normal', 'poison',
  'electric', 'ground', 'fairy', 'fighting', 'psychic',
  'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'flying'
];

// Estados de filtros por defecto
export const DEFAULT_FILTERS = {
  id: '',
  nombre: '',
  generacion: '',
  tipo: '',
  hp: '',
  attack: '',
  defense: '',
  weight: '',
  height: ''
};

// Configuración de ordenamiento por defecto
export const DEFAULT_SORT_CONFIG = {
  key: 'id',
  direction: 'ascending'
};

// Opciones de ordenamiento
export const SORT_OPTIONS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'Ataque' },
  { key: 'defense', label: 'Defensa' }
];

// Direcciones de ordenamiento
export const SORT_DIRECTIONS = [
  { key: 'ascending', label: 'Ascendente' },
  { key: 'descending', label: 'Descendente' }
];
