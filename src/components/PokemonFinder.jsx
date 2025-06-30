import React from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { useModal } from '../hooks/useModal';
import ImprovedFilterBar from './ImprovedFilterBar.jsx';
import PokemonCard from './PokemonCard.jsx';
import PokemonModal from './PokemonModal.jsx';
import Pagination from './Pagination.jsx';
import Footer from './Footer.jsx';

const PokemonFinder = () => {
  // Usar hooks personalizados para separar lógica
  const {
    pokemons,
    loading,
    error,
    filters,
    sortConfig,
    currentPage,
    totalPages,
    updateFilter,
    updateSortConfig,
    resetFilters,
    applyFiltersAndSort,
    goToNextPage,
    goToPrevPage,
    loadMorePokemon,
    hasResults,
    totalResults,
    canLoadMore
  } = usePokemon();

  const {
    isOpen: isModalOpen,
    data: selectedPokemon,
    openModal: openPokemonModal,
    closeModal: closePokemonModal
  } = useModal();

  // Manejadores de eventos simplificados
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    updateSortConfig(name, value);
  };

  const handleCardClick = (pokemon) => {
    openPokemonModal(pokemon);
  };

  const handleResetFilters = () => {
    resetFilters();
    applyFiltersAndSort();
  };

  // Renderizado condicional para errores
  if (error) {
    return (
      <div className="finder-container">
        <div className="error-message">
          <h2>😞 Oops! Algo salió mal</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="finder-container">
      <ImprovedFilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFiltersAndSort}
        onResetFilters={handleResetFilters}
        totalResults={totalResults}
        loading={loading}
      />
      
      <main>
        {loading ? (
          <div className="loading-container">
            <div className="pokeball-loader"></div>
            <p>Buscando Pokémon...</p>
          </div>
        ) : hasResults ? (
          <>
            <div className="results-info">
              <p>Mostrando {pokemons.length} de {totalResults} Pokémon</p>
            </div>
            
            <div className="pokemon-grid">
              {pokemons.map(pokemon => (
                <PokemonCard 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                  onCardClick={handleCardClick} 
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={goToNextPage}
                onPrevPage={goToPrevPage}
              />
            )}
            
            {canLoadMore && (
              <div className="load-more-section">
                <p className="load-more-info">
                  Mostrando {totalResults} Pokémon. ¿Quieres ver más?
                </p>
                <button 
                  onClick={loadMorePokemon}
                  className="load-more-btn"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : '🔥 Cargar Más Pokémon (hasta 500)'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <h2>🔍 No se encontraron Pokémon</h2>
            <p>Intenta ajustar tus filtros de búsqueda</p>
            <button onClick={handleResetFilters}>
              Limpiar filtros
            </button>
          </div>
        )}
      </main>
      
      {isModalOpen && selectedPokemon && (
        <PokemonModal 
          pokemon={selectedPokemon} 
          onClose={closePokemonModal} 
        />
      )}

      <Footer />
    </div>
  );
};

export default PokemonFinder;