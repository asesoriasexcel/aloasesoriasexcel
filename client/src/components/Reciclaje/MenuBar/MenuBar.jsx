import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './MenuBar.css'; // Asegúrate de tener un CSS independiente

const MenuBar = ({ items, onMenuClick, classPrefix }) => {
  return (
    <div className={`${classPrefix}-menu-bar`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${classPrefix}-menu-bar-item`}
          onClick={item.onClick}
        >
          {item.icon && <item.icon className={`${classPrefix}-menu-icon`} />}
          {item.label && <span>{item.label}</span>}
        </div>
      ))}
    </div>
  );
};

MenuBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType, // El componente del ícono (opcional)
      label: PropTypes.string, // Texto del ítem
      onClick: PropTypes.func, // Acción al hacer clic (opcional)
    })
  ).isRequired,
  onMenuClick: PropTypes.func, // Función para manejar clics del menú principal
  classPrefix: PropTypes.string, // Prefijo de las clases CSS
};

MenuBar.defaultProps = {
  onMenuClick: () => {},
  classPrefix: 'default', // Prefijo por defecto para evitar conflictos
};

export default MenuBar;
