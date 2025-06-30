import { useState, useEffect } from 'react';
import PokemonService from '../services/pokemonService.js';
import { getGenerationById, sortPokemons, applyFilters } from '../utils/pokemonUtils.js';
import { 
  PAGINATION, 
  DEFAULT_FILTERS, 
  DEFAULT_SORT_CONFIG 
} from '../constants/pokemonConstants.js';

/**
 * Hook personalizado para manejar toda la lógica de Pokémon
 * Separa la lógica de negocio de los componentes UI
 */
export const usePokemon = () => {
  // Estados principales
  const [allPokemonReferences, setAllPokemonReferences] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  // Estados de filtros y ordenamiento
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT_CONFIG);

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Cargar referencias de todos los Pokémon
        const pokemonList = await PokemonService.getAllPokemonReferences();
        setAllPokemonReferences(pokemonList.results);
        
        // Cargar TODOS los Pokémon desde el inicio (1050 Pokémon)
        const allIds = pokemonList.results.map((_, index) => index + 1).slice(0, 1050);
        const allPokemons = await PokemonService.getPokemonByIds(allIds);
        
        // Agregar información de generación
        const pokemonsWithGeneration = allPokemons.map(pokemon => ({
          ...pokemon,
          generation: getGenerationById(pokemon.id)
        }));
        
        // Guardar todos los Pokémon como datos base
        setFilteredPokemons(pokemonsWithGeneration);
        setLoading(false);
        
      } catch (err) {
        setError(err.message);
        console.error('Error loading initial data:', err);
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Función para ejecutar la búsqueda inicial completa
  const executeInitialSearch = async (pokemonReferences) => {
    try {
      // Obtener los primeros 200 Pokémon para mostrar una buena variedad inicial
      // Esto incluye las primeras 2 generaciones completas
      const initialIds = Array.from({ length: 200 }, (_, i) => i + 1);
      const allPokemons = await PokemonService.getPokemonByIds(initialIds);
      
      // Agregar información de generación
      const pokemonsWithGeneration = allPokemons.map(pokemon => ({
        ...pokemon,
        generation: getGenerationById(pokemon.id)
      }));
      
      // Aplicar ordenamiento por defecto
      const sortedPokemons = sortPokemons(pokemonsWithGeneration, DEFAULT_SORT_CONFIG);
      
      setFilteredPokemons(sortedPokemons);
      
    } catch (err) {
      console.error('Error en búsqueda inicial:', err);
      // Si falla, mantener los datos iniciales
    }
  };

  // Actualizar Pokémon mostrados cuando cambian los filtrados o la página
  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGINATION.POKEMONS_PER_PAGE;
    const endIndex = startIndex + PAGINATION.POKEMONS_PER_PAGE;
    
    setPokemons(filteredPokemons.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredPokemons.length / PAGINATION.POKEMONS_PER_PAGE));
  }, [currentPage, filteredPokemons]);

  // Funciones para manejar filtros
  const updateFilter = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const updateSortConfig = (name, value) => {
    setSortConfig(prevConfig => ({
      ...prevConfig,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSortConfig(DEFAULT_SORT_CONFIG);
    setCurrentPage(1);
  };

  // Aplicar filtros
  const applyFiltersAndSort = async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    
    try {
      let results = [...allPokemonReferences];
      
      // Si no hay filtros aplicados, cargar todos los Pokémon disponibles
      const hasFilters = Object.values(filters).some(value => value && value.toString().trim() !== '');
      
      if (!hasFilters) {
        // Sin filtros: cargar una cantidad razonable de Pokémon (250 para incluir más generaciones)
        const allIds = Array.from({ length: Math.min(250, PAGINATION.MAX_POKEMON_ID) }, (_, i) => i + 1);
        const detailedPokemons = await PokemonService.getPokemonByIds(allIds);
        
        // Agregar información de generación
        const pokemonsWithGeneration = detailedPokemons.map(pokemon => ({
          ...pokemon,
          generation: getGenerationById(pokemon.id)
        }));
        
        // Aplicar ordenamiento
        const sortedResults = sortPokemons(pokemonsWithGeneration, sortConfig);
        setFilteredPokemons(sortedResults);
        
      } else {
        // Con filtros: aplicar lógica de filtrado existente
        
        // Pre-filtrar por ID y nombre para optimizar
        if (filters.id) {
          results = results.filter(p => p.url.split('/')[6] === filters.id);
        }
        
        if (filters.nombre) {
          results = results.filter(p => 
            p.name.toLowerCase().includes(filters.nombre.toLowerCase())
          );
        }
        
        // Obtener detalles de los Pokémon filtrados
        const pokemonIds = results.map(p => parseInt(p.url.split('/')[6]));
        const detailedPokemons = await PokemonService.getPokemonByIds(pokemonIds);
        
        // Agregar información de generación
        const pokemonsWithGeneration = detailedPokemons.map(pokemon => ({
          ...pokemon,
          generation: getGenerationById(pokemon.id)
        }));
        
        // Aplicar filtros restantes
        let filteredResults = applyFilters(pokemonsWithGeneration, filters);
        
        // Aplicar ordenamiento
        filteredResults = sortPokemons(filteredResults, sortConfig);
        
        setFilteredPokemons(filteredResults);
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Error applying filters:', err);
      setFilteredPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  // Funciones de paginación
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Función para cargar más Pokémon (hasta 500)
  const loadMorePokemon = async () => {
    setLoading(true);
    try {
      const moreIds = Array.from({ length: Math.min(500, PAGINATION.MAX_POKEMON_ID) }, (_, i) => i + 1);
      const morePokemons = await PokemonService.getPokemonByIds(moreIds);
      
      const pokemonsWithGeneration = morePokemons.map(pokemon => ({
        ...pokemon,
        generation: getGenerationById(pokemon.id)
      }));
      
      const sortedResults = sortPokemons(pokemonsWithGeneration, sortConfig);
      setFilteredPokemons(sortedResults);
      
    } catch (err) {
      setError('Error al cargar más Pokémon: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    pokemons,
    loading,
    error,
    filters,
    sortConfig,
    currentPage,
    totalPages,
    
    // Funciones
    updateFilter,
    updateSortConfig,
    resetFilters,
    applyFiltersAndSort,
    goToNextPage,
    goToPrevPage,
    goToPage,
    loadMorePokemon,
    
    // Información adicional
    hasResults: pokemons.length > 0,
    totalResults: filteredPokemons.length,
    canLoadMore: filteredPokemons.length < 500 && filteredPokemons.length >= 200
  };
};
