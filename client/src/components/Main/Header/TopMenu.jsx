import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { AiOutlineAppstore, AiOutlineHome } from "react-icons/ai";
import { PiCompassTool } from "react-icons/pi";
import { Badge, Dropdown } from 'antd';
import './TopMenu.css';

import AnnouncementBanner from '../Anuncio/AnnouncementBanner';
import tiendaCategorias from '../../../data/tiendaCategorias';
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
    label: categoria.nombre,
    command: () => navigate(`/tienda/categoria/${categoria.id}`)
  }));

  // Lista de elementos del menú
  const items = [
    {
      label: 'Inicio',
      icon: <AiOutlineHome className="icon-menuapp" />,
      command: () => navigate('/')
    },
    {
      label: 'Catálogo de productos',
      icon: <AiOutlineAppstore className="icon-menuapp" />,
      command: () => navigate('/tienda')
    },
    {
      label: 'Diseño y Personalización',
      icon: <PiCompassTool className="icon-menuapp" />,
      command: () => navigate('/diseno')
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
    },
    ...(user ? [{
      label: 'Mis Compras',
      icon: 'pi pi-history',
      command: () => navigate('/admin/miscompras')
    }] : [])
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

  const userMenuItems = [
    {
      key: 'email',
      label: <span style={{ fontSize: '12px', color: 'var(--alo-gris)' }}>{user?.email}</span>,
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: 'Cerrar sesión',
      icon: <i className="pi pi-sign-out" style={{ fontSize: '12px' }} />,
      onClick: handleAuthClick,
      danger: true,
    },
  ];

  const authButton = user ? (
    <Dropdown
      menu={{ items: userMenuItems }}
      trigger={['click']}
      placement="bottomRight"
      overlayClassName="topmenu-user-dropdown"
    >
      <div className="topmenu-avatar-trigger" title={user.email}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="avatar" className="topmenu-avatar" referrerPolicy="no-referrer" />
        ) : (
          <div className="topmenu-avatar-fallback">{user.email?.[0]?.toUpperCase()}</div>
        )}
      </div>
    </Dropdown>
  ) : (
    <Button
      label={isMobile ? "" : "Iniciar sesión"}
      icon="pi pi-google"
      className="p-button-outlined p-button-sm topmenu-auth-btn"
      onClick={handleAuthClick}
      title="Iniciar sesión"
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
                  <span className="desktop-brand-alo">Aló </span>
                  <span className="desktop-brand-asesoria">Asesorías </span>
                  <span className="desktop-brand-excel">Excel</span>
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
            <div className="menu-inner">
              <Link to="/" className="desktop-brand-name">
                <span className="desktop-brand-text">
                  <span className="desktop-brand-alo">Aló </span>
                  <span className="desktop-brand-asesoria">Asesorías </span>
                  <span className="desktop-brand-excel">Excel</span>
                </span>
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
          </div>
        </>
      )}
    </>
  );
};

export default TopMenu;
