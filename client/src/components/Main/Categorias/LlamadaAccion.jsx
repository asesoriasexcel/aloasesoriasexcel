import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import { Button } from 'antd';
import { MdOutlineStorefront } from 'react-icons/md'; // Importamos el ícono de tienda
import './LlamadaAccion.css';

const LlamadaAccion = () => {
  return (
    <div className="llamada-accion">
      <h1 className="llamada-accion-titulo">Nuestros productos son únicos. Revisa nuestra tienda.</h1>
      {/* Usamos Link para la navegación */}
      <Link to="/tienda">
        <Button type="primary" className="btn-conicon btn-verde">
          <MdOutlineStorefront size={20} style={{ marginRight: '8px' }} /> {/* Ícono de tienda */}
          Tienda {/* Texto del botón */}
        </Button>
      </Link>
    </div>
  );
};

export default LlamadaAccion;
