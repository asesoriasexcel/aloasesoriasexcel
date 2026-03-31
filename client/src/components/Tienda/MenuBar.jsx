import React from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { FiShoppingCart } from 'react-icons/fi';
import { Badge } from 'antd';

import './MenuBar.css';

import logo from '../../images/logo/logo4.png';

const MenuBar = ({ onMenuClick }) => {
  // Obtener la cantidad de productos en el carrito
  const carritoCount = (JSON.parse(localStorage.getItem('ae-carrito')) || []).length;

  return (
    <div className="menu-bar">
      <div className="menu-bar-item" onClick={onMenuClick}>
        <MenuOutlined className="menu-icon" />
      </div>
      <div className="menu-bar-item">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '35px', width: 'auto' }} />
        </Link>
      </div>
      <div className="menu-bar-item">
        <Link to="/carrito"> {/* Usamos Link aquí */}
          <Badge
            count={carritoCount} // Total de productos en el carrito
            overflowCount={99} // Límite para mostrar "99+"
            style={{ backgroundColor: '#ff4d4f' }} // Color personalizado del badge
          >
            <FiShoppingCart
              className="menu-icon"
              style={{
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}
            />
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default MenuBar;
