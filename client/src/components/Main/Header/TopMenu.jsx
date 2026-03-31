import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { AiOutlineAppstore, AiOutlineHome } from "react-icons/ai";
import { PiCompassTool } from "react-icons/pi";
import { Badge } from 'antd';
import './TopMenu.css';

import AnnouncementBanner from '../Anuncio/AnnouncementBanner';
import tiendaCategorias from '../../../data/tiendaCategorias';
import logo from '../../../images/logo/logo4.png';
import { useAuth } from '../../../context/AuthContext';
import { loginWithGoogle, logout } from '../../../lib/firebase';

const TopMenu = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  // Obtener la cantidad de artículos en el carrito
  const carritoCount = (JSON.parse(localStorage.getItem('ae-carrito')) || []).length;

  // Crear los items dinámicamente a partir de la data de tiendaCategorias
  const tiendaItems = tiendaCategorias.map(categoria => ({
    label: (
      <Link to={`/tienda/categoria/${categoria.id}`} className="menu-link">
        {categoria.nombre}  {/* Usamos el nombre de cada categoría */}
      </Link>
    ),
  }));

  // Lista de elementos del menú
  const items = [
    {
      label: (
        <Link to="/" className="menu-link">
          <AiOutlineHome className="icon-menuapp" /> Inicio
        </Link>
      )
    },
    {
      label: 'Tienda de productos',
      icon: <AiOutlineAppstore className="icon-menuapp" />,
      items: tiendaItems,  // Insertamos los items dinámicamente
    },
    {
      label: (
        <Link to="/diseno" className="menu-link">
          <PiCompassTool className="icon-menuapp" /> Diseño y Personalización
        </Link>
      )
    },
    {
      label: 'Términos y Condiciones',
      icon: 'pi pi-file',
      command: () => navigate('/terminoscondiciones') // Redirige a la ruta /terminoscondiciones
    },
    {
      label: 'Contacto',
      icon: 'pi pi-envelope',
      command: () => navigate('/contacto') // Redirige a la ruta /contacto
    }
  ];

  // Detectar el tamaño de la pantalla
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAuthClick = async () => {
    if (user) {
      await logout();
    } else {
      await loginWithGoogle();
    }
  };

  const authButton = user ? (
    <div className="topmenu-auth" title={user.email}>
      {user.photoURL && (
        <img src={user.photoURL} alt="avatar" className="topmenu-avatar" referrerPolicy="no-referrer" />
      )}
      <Button
        label="Salir"
        icon="pi pi-sign-out"
        className="p-button-text p-button-sm topmenu-auth-btn"
        onClick={handleAuthClick}
      />
    </div>
  ) : (
    <Button
      label="Iniciar sesión"
      icon="pi pi-google"
      className="p-button-outlined p-button-sm topmenu-auth-btn"
      onClick={handleAuthClick}
    />
  );

  return (
    <>
      {/* Menú para móvil */}
      {isMobile && (
        <div id="main-menu" className="movil-menu-container">
          <AnnouncementBanner />
          <Menubar
            model={items}
            start={<div className="movil-menu-left"></div>}
            end={
              <div className="movil-menu-right">
                <Link to="/" className="movil-brand-name">
                  <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
                </Link>
                {carritoCount > 0 && (
                  <Badge
                    count={carritoCount}
                    overflowCount={99}
                    style={{ backgroundColor: '#ff4d4f' }}
                  >
                    <Button
                      icon="pi pi-shopping-cart"
                      className="p-button-rounded p-button-text movil-cart-button"
                      onClick={() => navigate('/carrito')}
                    />
                  </Badge>
                )}
                {authButton}
              </div>
            }
          />
        </div>
      )}

      {/* Menú para escritorio */}
      {!isMobile && (
        <>
          <AnnouncementBanner />
          <div id="main-menu" className="desktop-menu-container">
            <Link to="/" className="desktop-brand-name">
              <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
            </Link>
            <Menubar model={items} />
            <div className="topmenu-actions">
              {carritoCount > 0 && (
                <Badge
                  count={carritoCount}
                  overflowCount={99}
                  style={{ backgroundColor: '#ff4d4f' }}
                >
                  <Button
                    icon="pi pi-shopping-cart"
                    className="p-button-rounded p-button-text desktop-cart-button"
                    onClick={() => navigate('/carrito')}
                  />
                </Badge>
              )}
              {authButton}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopMenu;
