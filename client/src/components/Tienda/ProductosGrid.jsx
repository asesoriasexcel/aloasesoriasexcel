import React from 'react';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { trackDownload } from '../analytics';
import './ProductoGrid.css';

const obtenerColorPorGrado = (grado) => {
  switch (grado) {
    case 'Estándar':
      return 'green';
    case 'Avanzado':
      return 'blue';
    case 'Maestro':
      return 'red';
    default:
      return 'gray';
  }
};

const ProductosGrid = ({ productos, onAddToCart, onOpenModal }) => {
  const navigate = useNavigate();

  const handleComprar = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    const existeEnCarrito = carrito.find((item) => item.id_articulo === producto.id_articulo);

    if (!existeEnCarrito) {
      const nuevoArticulo = {
        id_articulo: producto.id_articulo,
        cantidad: 1,
        timestamp: new Date().toISOString(),
      };
      carrito.push(nuevoArticulo);
      localStorage.setItem('ae-carrito', JSON.stringify(carrito));
    }

    navigate('/carrito');
  };

  const handleDescargar = (producto) => {
    const fileName = producto.download;

    // Registrar el evento en Google Analytics
    trackDownload(fileName);

    // Redirigir al archivo para su descarga
    const fileUrl = `${process.env.PUBLIC_URL}/downloads/${fileName}`;
    window.location.href = fileUrl;  // Esto forzará la descarga
};


  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <div
          key={producto.id_articulo}
          className="producto-card"
          onClick={() => {
            if (producto.liberado !== 'si') {
              navigate(`/producto/${producto.id_articulo}`);
            }
          }}
          style={{
            cursor: producto.liberado === 'si' ? 'default' : 'pointer',
            pointerEvents: 'auto', // Asegura que el contenedor permita clics
          }}
        >
          <div className="cardproducto-imagen">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
          </div>
          <div className="cardproducto-contenido">
            <div className="cp-infotag">
              <div className="cp-tag">
                <span className="cp-tagversion">Versión:</span>
                <Tag
                  color={obtenerColorPorGrado(producto.grado)}
                  className="producto-grado"
                >
                  {producto.grado}
                </Tag>
              </div>
              {producto.liberado !== 'si' && (
                <button
                  className={`btn-primary btn-youtube ${
                    producto.video_si === 'no' ? 'disabled' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    producto.video_si === 'si' && onOpenModal(producto.video_link);
                  }}
                  disabled={producto.video_si === 'no'}
                >
                  Demo
                </button>
              )}
            </div>
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion-corta">
              {producto.descripcion.slice(0, 90)}...
            </p>
            {producto.liberado !== 'si' && (
              <p className="producto-precio">CLP ${producto.precio}</p>
            )}

          <div className="producto-botones">
            {producto.liberado === 'si' ? (
              <div className="descarga-con-texto">
                <span className="producto-liberado-banner">¡Producto Liberado!</span>
                <button
                  className="btn-primary btn-verde btn-descargar"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDescargar(producto);
                  }}
                >
                  Descargar
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn-primary btn-azul"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComprar(producto);
                  }}
                >
                  Comprar
                </button>
                <button
                  className="btn-primary btn-azulsecundario"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(producto);
                  }}
                >
                  Añadir al carrito
                </button>
              </>
            )}
          </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosGrid;
