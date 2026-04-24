import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Resetear scroll en window y en los contenedores internos
    // (necesario cuando #root o .app-container tienen height:100% y generan su propio scroll)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const root = document.getElementById('root');
    if (root) root.scrollTop = 0;

    const appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.scrollTop = 0;
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
