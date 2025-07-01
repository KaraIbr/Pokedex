// src/components/PokemonFinder.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from './FilterBar';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';
import Pagination from './Pagination';
import Footer from './Footer';

const generationMap = [
    { limit: 151, name: 'I' }, { limit: 251, name: 'II' },
    { limit: 386, name: 'III' }, { limit: 493, name: 'IV' },
    { limit: 649, name: 'V' }, { limit: 721, name: 'VI' },
    { limit: 809, name: 'VII' }, { limit: 905, name: 'VIII' },
    { limit: 1025, name: 'IX' }
];

const getGenerationById = (id) => {
    for (const gen of generationMap) {
        if (id <= gen.limit) return gen.name;
    }
    return 'Desconocida';
};

const POKEMONS_PER_PAGE = 30;

const PokemonFinder = () => {
    // ---- ESTADOS ----
    const [allPokemonReferences, setAllPokemonReferences] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        id: '', nombre: '', generacion: '', tipo: '',
        hp: '', attack: '', defense: '', weight: '', height: ''
    });
    // Nuevo estado para la configuración de orden
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    // ... (El useEffect inicial se mantiene igual)
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const allPokemonRes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025');
                setAllPokemonReferences(allPokemonRes.data.results);
                const randomIds = new Set();
                while (randomIds.size < POKEMONS_PER_PAGE) {
                    randomIds.add(Math.floor(Math.random() * 1025) + 1);
                }
                const randomPokemonPromises = [...randomIds].map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
                const randomPokemonResponses = await Promise.all(randomPokemonPromises);
                const randomPokemonData = randomPokemonResponses.map(res => ({ ...res.data, generation: getGenerationById(res.data.id) }));
                setFilteredPokemons(randomPokemonData);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * POKEMONS_PER_PAGE;
        const endIndex = startIndex + POKEMONS_PER_PAGE;
        setPokemons(filteredPokemons.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filteredPokemons.length / POKEMONS_PER_PAGE));
    }, [currentPage, filteredPokemons]);

    // ---- MANEJADORES DE EVENTOS ----
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['hp', 'attack', 'defense', 'weight', 'height', 'id'];
        if (numericFields.includes(name)) {
            const regex = /^\d*\.?\d*$/;
            if (regex.test(value)) {
                setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
            }
        } else {
            setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
        }
    };

    // Nuevo manejador para el cambio de orden
    const handleSortChange = (e) => {
        const { name, value } = e.target;
        setSortConfig(prevConfig => ({ ...prevConfig, [name]: value }));
    };

    const handleApplyFilters = async () => {
        setLoading(true);
        setCurrentPage(1);
        try {
            let results = [...allPokemonReferences];
            if (filters.id) results = results.filter(p => p.url.split('/')[6] === filters.id);
            if (filters.nombre) results = results.filter(p => p.name.includes(filters.nombre.toLowerCase()));

            const detailPromises = results.map(p => axios.get(p.url));
            const detailResponses = await Promise.all(detailPromises);
            let detailedPokemons = detailResponses.map(res => ({ ...res.data, generation: getGenerationById(res.data.id) }));

            if (filters.generacion) detailedPokemons = detailedPokemons.filter(p => p.generation === filters.generacion);
            if (filters.tipo) detailedPokemons = detailedPokemons.filter(p => p.types.some(typeInfo => typeInfo.type.name === filters.tipo));
            const statFilters = { hp: 'hp', attack: 'attack', defense: 'defense' };
            for (const key in statFilters) {
                if (filters[key]) detailedPokemons = detailedPokemons.filter(p => p.stats.find(s => s.stat.name === key)?.base_stat >= parseFloat(filters[key]));
            }
            if (filters.weight) detailedPokemons = detailedPokemons.filter(p => (p.weight / 10) >= parseFloat(filters.weight));
            if (filters.height) detailedPokemons = detailedPokemons.filter(p => (p.height / 10) >= parseFloat(filters.height));
            
            // ===== LÓGICA DE ORDENACIÓN =====
            detailedPokemons.sort((a, b) => {
                let valA, valB;
                // Asigna los valores a comparar según la clave de orden
                if (['hp', 'attack', 'defense'].includes(sortConfig.key)) {
                    valA = a.stats.find(s => s.stat.name === sortConfig.key)?.base_stat || 0;
                    valB = b.stats.find(s => s.stat.name === sortConfig.key)?.base_stat || 0;
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

            setFilteredPokemons(detailedPokemons);
        } catch (error) {
            console.error("Error al aplicar filtros:", error);
            setFilteredPokemons([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
    const handleCloseModal = () => setSelectedPokemon(null);

    // ---- RENDERIZADO ----
    return (
        <div className="finder-container">
            <FilterBar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
            />
            <main>
                {loading ? (
                    <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Buscando...</p>
                ) : pokemons.length > 0 ? (
                    <>
                        <div className="pokemon-grid">
                            {pokemons.map(pokemon => (
                                <PokemonCard key={pokemon.id} pokemon={pokemon} onCardClick={handleCardClick} />
                            ))}
                        </div>
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            onPrevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        />
                    </>
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No se encontraron Pokémon con esos criterios.</p>
                )}
            </main>
            {selectedPokemon && <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />}
                <Footer/>

        </div>
    );
};

export default PokemonFinder;