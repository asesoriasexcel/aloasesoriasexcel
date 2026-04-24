import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  PlusCircleOutlined,
  HomeOutlined,
  ShopOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';

const NAV_GROUPS = [
  {
    id: 'sitio',
    label: 'Sitio',
    items: [
      { to: '/', label: 'Inicio', icon: <HomeOutlined />, exact: true },
      { to: '/tienda', label: 'Tienda', icon: <ShopOutlined /> },
    ],
  },
  {
    id: 'admin',
    label: 'Administración',
    items: [
      {
        id: 'catalogo',
        label: 'Catálogo',
        icon: <AppstoreOutlined />,
        children: [
          { to: '/admin', label: 'Productos', exact: true },
          { to: '/admin/producto/nuevo', label: 'Nuevo producto' },
        ],
      },
    ],
  },
];

const CollapseItem = ({ item, location }) => {
  const isChildActive = item.children?.some((c) =>
    c.exact ? location.pathname === c.to : location.pathname.startsWith(c.to)
  );
  const [open, setOpen] = useState(isChildActive);

  return (
    <>
      <button
        className={`admin-sidebar__item${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="admin-sidebar__item-icon">{item.icon}</span>
        <span className="admin-sidebar__item-label">{item.label}</span>
        <RightOutlined className="admin-sidebar__item-chevron" />
      </button>
      <div
        className="admin-sidebar__subitems"
        style={{ maxHeight: open ? `${item.children.length * 34}px` : '0px' }}
      >
        {item.children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            end={child.exact}
            className={({ isActive }) =>
              `admin-sidebar__subitem${isActive ? ' is-active' : ''}`
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

const AdminSidebar = ({ user }) => {
  const location = useLocation();
  const initials = user?.email?.[0]?.toUpperCase() ?? 'A';

  return (
    <>
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__brand-icon">
          <span>A</span>
        </div>
        <span className="admin-sidebar__brand-label">Aló Admin</span>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Navegación admin">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="admin-sidebar__group">
            <p className="admin-sidebar__group-label">{group.label}</p>
            {group.items.map((item) =>
              item.children ? (
                <CollapseItem key={item.id} item={item} location={location} />
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `admin-sidebar__item${isActive ? ' is-active' : ''}`
                  }
                >
                  <span className="admin-sidebar__item-icon">{item.icon}</span>
                  <span className="admin-sidebar__item-label">{item.label}</span>
                </NavLink>
              )
            )}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__user">
          <div className="admin-sidebar__user-avatar">{initials}</div>
          <div className="admin-sidebar__user-info">
            <div className="admin-sidebar__user-name">
              {user?.email ?? 'admin'}
            </div>
            <div className="admin-sidebar__user-role">Administrador</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
