import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
// PrimeReact styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'antd/dist/reset.css';

const Header = () => {
  const navigate = useNavigate();

  const goToTienda = () => {
    navigate('/tienda');
  };

  return (
    <header id="lp-header" className="header">
      <div className="header-video-wrapper">
        <video
          className="header-video"
          src="/landinghead.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="header-overlay" />
      <div className="header-sheet">
        <div className="header-content">
          <div className="column">
            <h1>
              <span className="header1">Aló! AsesoriasExcel</span>
              <span className="header2">Soluciones en Excel y Otras Tecnologías</span>
            </h1>
            <div className="button-group">
              <button
                className="action-button btn-primary btn-verde btn-h1"
                onClick={goToTienda}
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
