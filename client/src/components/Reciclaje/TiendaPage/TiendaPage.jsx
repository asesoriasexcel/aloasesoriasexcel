import React from 'react';
import productosDestacados from '../../../data/productosDestacados';
import { MdAddBusiness } from "react-icons/md";
import { Link } from 'react-router-dom';  // Usamos Link para navegación en React Router
import { Breadcrumb } from 'antd';  // Importamos el componente Breadcrumb de Ant Design
import './TiendaPage.css';

const TiendaPage = () => {
  return (
    <div className="cuerpo-page-container">
      {/* Breadcrumb de Ant Design */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Nuestros Productos
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Título "Nuestros Productos" */}
      <h1 className="titulo-productos">Tienda de Productos</h1>

      <div className="productos-grid">
        {productosDestacados.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="producto-imagen"
            />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion-corta">
              {producto.descripcion.slice(0, 100)}...
            </p>
            <p className="producto-precio">Precio: ${producto.precio}</p>
            <div className="producto-botones">
              <button className="btn-primary btn-azul">
                Ver más
              </button>
              <button className="btn-addcart btn-primary btn-naranjo">
                <MdAddBusiness />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiendaPage;
