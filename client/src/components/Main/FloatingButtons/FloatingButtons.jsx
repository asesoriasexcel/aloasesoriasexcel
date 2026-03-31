import React from 'react';
import { MdOutlineStorefront } from "react-icons/md"; // Ícono de tienda
import { IoIosArrowUp } from "react-icons/io"; // Ícono de flecha

import './FloatingButtons.css';

const FloatingButtons = () => {

  // Función para hacer scroll al div con id especificado
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-buttons-container">
      {/* Botón de tienda */}
      <button
        onClick={() => scrollToElement('lp-tienda')} // Cambia el id según corresponda
        className="floating-button storefront"
      >
        <MdOutlineStorefront size={32} color="#fff" />
      </button>

      {/* Botón de flecha */}
      <button
        onClick={() => scrollToElement('lp-header')} // Cambia el id según corresponda
        className="floating-button arrow"
      >
        <IoIosArrowUp size={32} color="#fff" />
      </button>
    </div>
  );
};

export default FloatingButtons;
