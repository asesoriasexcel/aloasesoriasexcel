import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Forzar el scroll al inicio cada vez que cambie la ruta
    window.scrollTo(0, 0);
  }, [location.pathname]); // Ejecuta el efecto cuando la ruta cambia

  return null;
};

export default ScrollToTop;
