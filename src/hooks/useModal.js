import { useState } from 'react';

/**
 * Hook personalizado para manejar modales
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const openModal = (modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    toggleModal
  };
};
