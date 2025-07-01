import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Configuración base de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  // Configuración para reintentos
  retry: 3,
  retryDelay: 1000,
});

// Interceptor para manejo de errores y reintentos
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    
    // Implementar reintentos para errores de red
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    
    config.__retryCount = config.__retryCount || 0;
    
    if (config.__retryCount >= config.retry) {
      return Promise.reject(error);
    }
    
    config.__retryCount += 1;
    
    // Reintentar solo para errores de red o timeouts
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.response?.status >= 500) {
      console.warn(`Reintentando petición (${config.__retryCount}/${config.retry}):`, config.url);
      
      // Esperar antes del reintento
      await new Promise(resolve => setTimeout(resolve, config.retryDelay * config.__retryCount));
      
      return api(config);
    }
    
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
      // Manejo específico de errores
      if (error.response?.status === 404) {
        throw new Error(`El Pokémon con ID ${id} no existe`);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error(`Timeout al obtener Pokémon ${id}`);
      } else if (error.message === 'Network Error') {
        throw new Error(`Error de red al obtener Pokémon ${id}`);
      }
      throw new Error(`Error al obtener Pokémon ${id}: ${error.message}`);
    }
  },

  // Obtener múltiples Pokémon por IDs con manejo robusto de errores
  async getPokemonByIds(ids) {
    try {
      // Dividir en lotes más pequeños para evitar sobrecargar la API
      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < ids.length; i += batchSize) {
        batches.push(ids.slice(i, i + batchSize));
      }

      const allResults = [];
      
      for (const batch of batches) {
        const batchPromises = batch.map(async (id) => {
          try {
            return await this.getPokemonById(id);
          } catch (error) {
            console.warn(`Error al obtener Pokémon ${id}:`, error.message);
            return null; // Retornar null en lugar de fallar toda la operación
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        allResults.push(...batchResults);
        
        // Pequeña pausa entre lotes para no sobrecargar la API
        if (batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // Filtrar resultados nulos
      return allResults.filter(result => result !== null);
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

  // Buscar Pokémon por nombre (exacto)
  async getPokemonByName(name) {
    const cacheKey = `pokemon-name-${name.toLowerCase()}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    try {
      const response = await api.get(`/pokemon/${name.toLowerCase()}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // No encontrado
      }
      throw new Error(`Error al buscar Pokémon por nombre: ${error.message}`);
    }
  },

  // Limpiar cache
  clearCache() {
    cache.clear();
  }
};

export default PokemonService;
