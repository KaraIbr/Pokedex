// Configuración de paginación
export const PAGINATION = {
  POKEMONS_PER_PAGE: 30,
  MAX_POKEMON_ID: 1025
};

// Tipos de Pokémon disponibles
export const POKEMON_TYPES = [
  "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", 
  "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

// Colores para cada tipo de Pokémon
export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

// Filtros por defecto (inicializar como objetos vacíos para evitar undefined)
export const DEFAULT_FILTERS = {
  searchTerm: '',
  type: '',
  hp: '',
  attack: '',
  defense: '',
  weight: '',
  height: ''
};

// Configuración de ordenamiento
export const DEFAULT_SORT_CONFIG = {
  key: 'id',
  direction: 'ascending'
};

// Opciones de ordenamiento
export const SORT_OPTIONS = [
  { key: 'id', label: 'Ordenar por ID' },
  { key: 'name', label: 'Ordenar A - Z' },
  { key: 'hp', label: 'Cantidad de HP' },
  { key: 'attack', label: 'Cantidad de Ataque' },
  { key: 'defense', label: 'Cantidad de Defensa' }
];
