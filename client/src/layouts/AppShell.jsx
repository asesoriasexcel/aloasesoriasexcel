import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import {
  MenuOutlined, CloseOutlined,
  HomeOutlined, ShoppingOutlined,
  AppstoreOutlined, PlusOutlined,
  ShoppingCartOutlined, UnlockOutlined, FolderOutlined,
  WalletOutlined, QuestionCircleOutlined, ProfileOutlined
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
        <div className="shell-sidebar__brand-dot">A</div>
        <span className="shell-sidebar__brand-name">Aló Excel</span>
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

        {/* Categorías */}
        <div className="shell-sidebar__section">
          <p className="shell-sidebar__section-label">Categorías</p>

          {tiendaCategorias.map((cat) => {
            const count = productos.filter(
              (p) => String(p.id_categoria) === String(cat.id)
            ).length;

            return (
              <NavLink
                key={cat.id}
                to={`/tienda/categoria/${cat.id}`}
                className={({ isActive }) =>
                  `shell-sidebar__item${isActive ? ' is-active' : ''}`
                }
                onClick={onNavigate}
              >
                <span className="shell-sidebar__item-icon"><FolderOutlined /></span>
                <span className="shell-sidebar__item-label">{cat.nombre}</span>
                {count > 0 && (
                  <span className="shell-sidebar__item-count">{count}</span>
                )}
              </NavLink>
            );
          })}
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

  const contentClass = isAdmin ? 'shell-content shell-content--admin admin-shell' : 'shell-content shell-content--tienda';

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
            {title && <span className="shell-topbar__title">{title}</span>}
          </div>
          <div className="shell-topbar__right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', color: 'var(--shell-text-primary)', textDecoration: 'none' }}>
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
