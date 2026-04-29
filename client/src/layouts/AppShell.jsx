import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import {
  MenuOutlined, CloseOutlined,
  HomeOutlined, ShoppingOutlined,
  AppstoreOutlined, PlusOutlined,
  ShoppingCartOutlined, UnlockOutlined, FolderOutlined,
  WalletOutlined, QuestionCircleOutlined, ProfileOutlined,
  FileTextOutlined, MailOutlined, BarChartOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import tiendaCategorias from '../data/tiendaCategorias';
import './AppShell.css';
import './admin/AdminTokens.css';
import './admin/AdminComponents.css';

const ADMIN_EMAIL = 'aloasesoriasexcel@gmail.com';

const getCartCount = () =>
  (JSON.parse(localStorage.getItem('ae-carrito')) || []).length;

/* ── Sidebar tienda ──────────────────────────────────────────── */

const SidebarTienda = ({ productos, isAdminUser, onNavigate }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Brand */}
      <Link to="/" className="shell-sidebar__brand" onClick={onNavigate}>
        <span className="shell-sidebar__brand-name">
          <span className="shell-brand-alo">Aló&nbsp;</span>
          <span className="shell-brand-asesoria">Asesorías&nbsp;</span>
          <span className="shell-brand-excel">Excel</span>
        </span>
      </Link>

      <nav className="shell-sidebar__nav">
        {/* General */}
        <div className="shell-sidebar__section">
          <p className="shell-sidebar__section-label">General</p>

          <NavLink
            to="/tienda"
            end
            className={({ isActive }) =>
              `shell-sidebar__item${isActive ? ' is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><AppstoreOutlined /></span>
            <span className="shell-sidebar__item-label">Todos los productos</span>
          </NavLink>

          <NavLink
            to="/tienda/liberados"
            className={({ isActive }) =>
              `shell-sidebar__item${isActive ? ' is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><UnlockOutlined /></span>
            <span className="shell-sidebar__item-label">Productos gratuitos</span>
          </NavLink>

          <NavLink
            to="/admin/miscompras"
            className={({ isActive }) =>
              `shell-sidebar__item${isActive ? ' is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><ProfileOutlined /></span>
            <span className="shell-sidebar__item-label">Mis Compras</span>
          </NavLink>
        </div>

        {/* Otros servicios */}
        <div className="shell-sidebar__section">
          <p className="shell-sidebar__section-label">Otros servicios</p>
          <NavLink
            to="/diseno"
            className={({ isActive }) =>
              `shell-sidebar__item${isActive ? ' is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><PlusOutlined /></span>
            <span className="shell-sidebar__item-label">Diseño Personalizado</span>
          </NavLink>
        </div>

        {/* Explorar */}
        <div className="shell-sidebar__section">
          <p className="shell-sidebar__section-label">Explorar</p>
          <a
            href="/#faq"
            className="shell-sidebar__item"
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><QuestionCircleOutlined /></span>
            <span className="shell-sidebar__item-label">Preguntas Frecuentes</span>
          </a>
          <NavLink
            to="/terminoscondiciones"
            className={({ isActive }) =>
              `shell-sidebar__item${isActive ? ' is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><FileTextOutlined /></span>
            <span className="shell-sidebar__item-label">Términos y Condiciones</span>
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `shell-sidebar__item${isActive ? ' is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <span className="shell-sidebar__item-icon"><MailOutlined /></span>
            <span className="shell-sidebar__item-label">Contacto</span>
          </NavLink>
        </div>

        {/* Administración (solo visible para admin) */}
        {isAdminUser && (
          <div className="shell-sidebar__section">
            <p className="shell-sidebar__section-label">Administración</p>

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `shell-sidebar__item${isActive ? ' is-active' : ''}`
              }
              onClick={onNavigate}
            >
              <span className="shell-sidebar__item-icon"><AppstoreOutlined /></span>
              <span className="shell-sidebar__item-label">Panel Admin</span>
            </NavLink>

            <NavLink
              to="/admin/producto/nuevo"
              className={({ isActive }) =>
                `shell-sidebar__item${isActive ? ' is-active' : ''}`
              }
              onClick={onNavigate}
            >
              <span className="shell-sidebar__item-icon"><PlusOutlined /></span>
              <span className="shell-sidebar__item-label">Nuevo producto</span>
            </NavLink>

            <NavLink
              to="/admin/wallet"
              className={({ isActive }) =>
                `shell-sidebar__item${isActive ? ' is-active' : ''}`
              }
              onClick={onNavigate}
            >
              <span className="shell-sidebar__item-icon"><WalletOutlined /></span>
              <span className="shell-sidebar__item-label">Billetera</span>
            </NavLink>

            <NavLink
              to="/admin/ventas"
              className={({ isActive }) =>
                `shell-sidebar__item${isActive ? ' is-active' : ''}`
              }
              onClick={onNavigate}
            >
              <span className="shell-sidebar__item-icon"><BarChartOutlined /></span>
              <span className="shell-sidebar__item-label">Ventas</span>
            </NavLink>

            <NavLink
              to="/admin/faq"
              className={({ isActive }) =>
                `shell-sidebar__item${isActive ? ' is-active' : ''}`
              }
              onClick={onNavigate}
            >
              <span className="shell-sidebar__item-icon"><QuestionCircleOutlined /></span>
              <span className="shell-sidebar__item-label">FAQs</span>
            </NavLink>
          </div>
        )}
      </nav>

      <div className="shell-sidebar__footer">
        <Link to="/" className="shell-sidebar__back-link" onClick={onNavigate}>
          <HomeOutlined />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </>
  );
};



/* ── Topbar title por ruta ───────────────────────────────────── */

const useTopbarTitle = (pathname) => {
  if (pathname === '/tienda') return 'Tienda';
  if (pathname === '/tienda/liberados') return 'Productos gratuitos';
  if (pathname.startsWith('/tienda/categoria/')) return 'Tienda';
  if (pathname.startsWith('/producto/')) return 'Producto';
  if (pathname === '/carrito') return 'Carrito';
  if (pathname === '/confirmacompra') return 'Confirmar compra';
  if (pathname === '/admin') return 'Panel de administración';
  if (pathname === '/admin/producto/nuevo') return 'Nuevo producto';
  if (pathname.startsWith('/admin/producto/editar/')) return 'Editar producto';
  if (pathname === '/admin/wallet') return 'Billetera';
  if (pathname === '/admin/ventas') return 'Ventas';
  if (pathname === '/admin/faq') return 'Preguntas Frecuentes';
  if (pathname === '/admin/miscompras') return 'Mis Compras';
  return '';
};

/* ── AppShell ────────────────────────────────────────────────── */

const AppShell = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [cartCount, setCartCount] = useState(getCartCount());

  useEffect(() => {
    const sync = () => setCartCount(getCartCount());
    window.addEventListener('storage', sync);
    const interval = setInterval(sync, 500);
    return () => { window.removeEventListener('storage', sync); clearInterval(interval); };
  }, []);

  const fetchProductos = () => {
    import('../lib/api').then(({ getProducts }) =>
      getProducts().then(setProductos).catch(() => {})
    );
  };

  useEffect(() => {
    fetchProductos();
    window.addEventListener('adminProductsChanged', fetchProductos);
    return () => window.removeEventListener('adminProductsChanged', fetchProductos);
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');
  const isAdminUser = user?.email === ADMIN_EMAIL;
  const title = useTopbarTitle(location.pathname);

  const closeSidebar = () => setSidebarOpen(false);

  const isMisCompras = location.pathname.includes('miscompras');
  const contentClass = (isAdmin && !isMisCompras) ? 'shell-content shell-content--admin admin-shell' : 'shell-content shell-content--tienda';

  return (
    <div className="app-shell">
      {/* Sidebar (Único unificado) */}
      <aside className={`shell-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <SidebarTienda productos={productos} isAdminUser={isAdminUser} onNavigate={closeSidebar} />
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="shell-overlay" onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* Main */}
      <div className="shell-main">
        {/* Topbar */}
        <header className="shell-topbar">
          <div className="shell-topbar__left">
            <button
              className="shell-topbar__toggle"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Menú"
            >
              {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
            <Link to="/" className="shell-topbar__brand">
              <span className="shell-brand-alo">Aló&nbsp;</span>
              <span className="shell-brand-asesoria">Asesorías&nbsp;</span>
              <span className="shell-brand-excel">Excel</span>
            </Link>
          </div>
          <div className="shell-topbar__right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', color: 'var(--shell-text-primary)', textDecoration: 'none', marginRight: '8px' }}>
              <Badge count={cartCount} size="small" offset={[4, -2]}>
                <ShoppingCartOutlined style={{ fontSize: '20px', color: 'var(--shell-text-primary)' }} />
              </Badge>
            </Link>
          </div>
        </header>

        {/* Contenido — nunca se desmonta el shell, solo esto */}
        <main className={contentClass}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
