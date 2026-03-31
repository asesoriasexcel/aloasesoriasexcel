// components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Aseguramos que el scroll se mueva a la parte superior de la página
    window.scrollTo(0, 0);
  }, [location]); // El hook se activa cada vez que cambia la ubicación

  return null; // Este componente no necesita renderizar nada
};

export default ScrollToTop;
