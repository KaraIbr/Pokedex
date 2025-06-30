// src/components/Pagination.js

import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  if (totalPages <= 1) {
    return null; // No mostrar la paginación si solo hay una página
  }

  return (
    <div className="pagination-container">
      <button 
        onClick={onPrevPage} 
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ‹ Anterior
      </button>
      <span className="page-info">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        onClick={onNextPage} 
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Siguiente ›
      </button>
    </div>
  );
};

export default Pagination;