import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import './AdminShell.css';
import './AdminComponents.css';

const ADMIN_EMAIL = 'aloasesoriasexcel@gmail.com';

const BREADCRUMB_MAP = {
  '/admin': [{ label: 'Administración', to: null }],
  '/admin/producto/nuevo': [
    { label: 'Catálogo', to: '/admin' },
    { label: 'Nuevo producto', to: null },
  ],
};

const getBreadcrumbs = (pathname) => {
  if (BREADCRUMB_MAP[pathname]) return BREADCRUMB_MAP[pathname];
  if (pathname.startsWith('/admin/producto/editar/')) {
    return [
      { label: 'Catálogo', to: '/admin' },
      { label: 'Editar producto', to: null },
    ];
  }
  return [{ label: 'Administración', to: null }];
};

const AdminLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const crumbs = getBreadcrumbs(location.pathname);

  /* ── Auth verificando ───────────────────────────────────────── */
  if (user === undefined) {
    return (
      <div className="admin-shell">
        <div className="admin-loading-state" style={{ flex: 1 }}>
          <Spin size="large" />
          <span>Verificando permisos...</span>
        </div>
      </div>
    );
  }

  /* ── Acceso denegado ────────────────────────────────────────── */
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="admin-shell">
        <div className="admin-access-denied" style={{ flex: 1 }}>
          <div className="admin-access-denied__card">
            <h2 className="admin-access-denied__title">Acceso restringido</h2>
            <p className="admin-access-denied__desc">
              Inicia sesión con la cuenta de administrador para gestionar la tienda.
            </p>
            <Link to="/">
              <button className="btn-azul" style={{ cursor: 'pointer', border: 'none', fontSize: 14, padding: '8px 20px', borderRadius: 8 }}>
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Shell completo ─────────────────────────────────────────── */
  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <AdminSidebar user={user} />
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <button
            className="admin-mobile-toggle"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>

          <nav className="admin-topbar__breadcrumb" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="admin-topbar__separator">/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="admin-topbar__crumb">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="admin-topbar__crumb is-current">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </header>

        {/* Contenido de la página */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
