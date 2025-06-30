import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Configuración base de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Cache simple para evitar llamadas repetidas
const cache = new Map();

const PokemonService = {
  // Obtener lista completa de Pokémon
  async getAllPokemonReferences(limit = 1025) {
    const cacheKey = `pokemon-list-${limit}`;
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    try {
      const response = await api.get(`/pokemon?limit=${limit}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener lista de Pokémon: ${error.message}`);
    }
  },

  // Obtener detalles de un Pokémon específico
  async getPokemonById(id) {
    const cacheKey = `pokemon-${id}`;
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    try {
      const response = await api.get(`/pokemon/${id}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener Pokémon ${id}: ${error.message}`);
    }
  },

  // Obtener múltiples Pokémon por IDs
  async getPokemonByIds(ids) {
    try {
      const promises = ids.map(id => this.getPokemonById(id));
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw new Error(`Error al obtener múltiples Pokémon: ${error.message}`);
    }
  },

  // Obtener Pokémon aleatorios
  async getRandomPokemon(count = 30, maxId = 1025) {
    try {
      const randomIds = new Set();
      while (randomIds.size < count) {
        randomIds.add(Math.floor(Math.random() * maxId) + 1);
      }
      
      return await this.getPokemonByIds([...randomIds]);
    } catch (error) {
      throw new Error(`Error al obtener Pokémon aleatorios: ${error.message}`);
    }
  },

  // Obtener información de tipo
  async getPokemonType(typeName) {
    const cacheKey = `type-${typeName}`;
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    try {
      const response = await api.get(`/type/${typeName}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener tipo ${typeName}: ${error.message}`);
    }
  },

  // Limpiar cache
  clearCache() {
    cache.clear();
  }
};

export default PokemonService;
