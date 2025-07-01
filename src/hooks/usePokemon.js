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
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de carga por lotes
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [totalToLoad, setTotalToLoad] = useState(1050);
  const [loadedCount, setLoadedCount] = useState(0);
  
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
        // Cargar referencias de todos los Pokémon para saber el total
        const pokemonList = await PokemonService.getAllPokemonReferences();
        setAllPokemonReferences(pokemonList.results);
        setTotalToLoad(Math.min(pokemonList.results.length, 1050));
        
        // Comenzar carga por lotes
        await loadPokemonInBatches(pokemonList.results);
        
      } catch (err) {
        setError(err.message);
        console.error('Error loading initial data:', err);
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Función para cargar Pokémon por lotes
  const loadPokemonInBatches = async (pokemonReferences) => {
    const BATCH_SIZE = 50; // Cargar 50 Pokémon por lote
    const totalPokemon = Math.min(pokemonReferences.length, 1050);
    const allLoadedPokemon = [];
    
    try {
      // Cargar el primer lote inmediatamente para mostrar contenido
      const firstBatchIds = Array.from({ length: Math.min(BATCH_SIZE, totalPokemon) }, (_, i) => i + 1);
      const firstBatch = await PokemonService.getPokemonByIds(firstBatchIds);
      
      const firstBatchWithGeneration = firstBatch.map(pokemon => ({
        ...pokemon,
        generation: getGenerationById(pokemon.id)
      }));
      
      allLoadedPokemon.push(...firstBatchWithGeneration);
      setAllPokemonData([...allLoadedPokemon]);
      setFilteredPokemons([...allLoadedPokemon]);
      setLoadedCount(firstBatch.length);
      setLoadingProgress((firstBatch.length / totalPokemon) * 100);
      setLoading(false); // Ya podemos mostrar contenido
      
      // Cargar el resto en lotes en segundo plano
      for (let i = BATCH_SIZE; i < totalPokemon; i += BATCH_SIZE) {
        const batchIds = Array.from(
          { length: Math.min(BATCH_SIZE, totalPokemon - i) }, 
          (_, index) => i + index + 1
        );
        
        try {
          const batch = await PokemonService.getPokemonByIds(batchIds);
          const batchWithGeneration = batch.map(pokemon => ({
            ...pokemon,
            generation: getGenerationById(pokemon.id)
          }));
          
          allLoadedPokemon.push(...batchWithGeneration);
          
          // Actualizar estados
          setAllPokemonData([...allLoadedPokemon]);
          setLoadedCount(allLoadedPokemon.length);
          setLoadingProgress((allLoadedPokemon.length / totalPokemon) * 100);
          
          // Reaplizar filtros si hay datos filtrados
          if (allLoadedPokemon.length <= filteredPokemons.length || !filters.searchTerm) {
            const sortedData = sortPokemons([...allLoadedPokemon], sortConfig);
            const filteredData = applyFilters(sortedData, filters);
            setFilteredPokemons(filteredData);
          }
          
          // Pequeña pausa para no sobrecargar la API
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (batchError) {
          console.warn(`Error loading batch ${i}-${i + BATCH_SIZE}:`, batchError);
          // Continuar con el siguiente lote aunque falle uno
        }
      }
      
    } catch (err) {
      console.error('Error in batch loading:', err);
      setError(err.message);
    }
  };

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

  // Actualizar filtros en tiempo real
  useEffect(() => {
    if (allPokemonData.length > 0) {
      let filtered = allPokemonData;
      
      // Filtro por nombre
      if (filters.searchTerm && filters.searchTerm.trim() !== '') {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      }
      
      // Filtro por tipo
      if (filters.type && filters.type !== '') {
        filtered = filtered.filter(p => p.types.some(t => t.type.name === filters.type));
      }

      // Filtro por habilidad
      if (filters.ability && filters.ability !== '') {
        filtered = filtered.filter(p => p.abilities.some(a => a.ability.name === filters.ability));
      }

      // Filtro por altura (height)
      if (filters.height.min !== '' || filters.height.max !== '') {
        filtered = filtered.filter(p => {
          const height = p.height / 10; // La API devuelve la altura en decímetros
          return (!filters.height.min || height >= Number(filters.height.min)) &&
                 (!filters.height.max || height <= Number(filters.height.max));
        });
      }

      // Filtros por stats base
      const { stats } = filters;
      if (Object.values(stats).some(stat => stat.min !== '' || stat.max !== '')) {
        filtered = filtered.filter(p => {
          const statsMap = p.stats.reduce((acc, s) => {
            acc[s.stat.name] = s.base_stat;
            return acc;
          }, {});

          return (!stats.hp.min || statsMap.hp >= Number(stats.hp.min)) &&
                 (!stats.hp.max || statsMap.hp <= Number(stats.hp.max)) &&
                 (!stats.attack.min || statsMap.attack >= Number(stats.attack.min)) &&
                 (!stats.attack.max || statsMap.attack <= Number(stats.attack.max)) &&
                 (!stats.defense.min || statsMap.defense >= Number(stats.defense.min)) &&
                 (!stats.defense.max || statsMap.defense <= Number(stats.defense.max));
        });
      }

      setFilteredPokemons(filtered);
      setCurrentPage(1);
    }
  }, [filters, allPokemonData]);

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
      // Usar los datos ya cargados en lugar de hacer nuevas peticiones
      let dataToFilter = [...allPokemonData];
      
      // Aplicar filtros a los datos disponibles
      const filteredData = applyFilters(dataToFilter, filters);
      
      // Aplicar ordenamiento
      const sortedData = sortPokemons(filteredData, sortConfig);
      
      setFilteredPokemons(sortedData);
      setLoading(false);
      
    } catch (err) {
      setError(err.message);
      console.error('Error applying filters:', err);
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

  // Buscar Pokémon por nombre exacto usando la API
  const searchPokemonByName = async (name) => {
    setLoading(true);
    setError(null);
    try {
      if (!name) {
        // Si el campo está vacío, restaurar el listado local
        applyFiltersAndSort();
        return;
      }
      const result = await PokemonService.getPokemonByName(name);
      if (result) {
        setFilteredPokemons([{ ...result, generation: getGenerationById(result.id) }]);
      } else {
        setFilteredPokemons([]); // No encontrado
      }
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setFilteredPokemons([]);
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
    
    // Estados de carga por lotes
    loadingProgress,
    totalToLoad,
    loadedCount,
    
    // Funciones
    updateFilter,
    updateSortConfig,
    resetFilters,
    applyFiltersAndSort,
    goToNextPage,
    goToPrevPage,
    goToPage,
    searchPokemonByName,
    
    // Información adicional
    hasResults: pokemons.length > 0,
    totalResults: totalToLoad, // Mostrar el total que se va a cargar
    actualResults: filteredPokemons.length, // Los que realmente están cargados y filtrados
    isFullyLoaded: loadedCount >= totalToLoad
  };
};
