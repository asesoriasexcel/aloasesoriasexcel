import React from 'react';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
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
    const existeEnCarrito = carrito.find((item) => item.id === producto.id);

    if (!existeEnCarrito) {
      const nuevoArticulo = {
        id_articulo: producto.id_articulo || producto.id,
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
        timestamp: new Date().toISOString(),
      };
      carrito.push(nuevoArticulo);
      localStorage.setItem('ae-carrito', JSON.stringify(carrito));
      window.dispatchEvent(new Event('storage'));
      navigate('/carrito');
    } else {
      // If it already exists, just go to cart. Or show an alert? 
      // The user wants it to just not add it again. We will just navigate to cart.
      navigate('/carrito');
    }
  };

  const handleDescargar = (producto) => {
    const fileName = producto.download;
    trackDownload(fileName);
    const fileUrl = `${process.env.PUBLIC_URL}/downloads/${fileName}`;
    window.location.href = fileUrl;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
      {productos.map((producto) => (
        <div
          key={producto.id_articulo || producto.id}
          onClick={() => {
            if (producto.liberado !== 'si' && !producto.liberado) {
              navigate(`/producto/${producto.id_articulo || producto.id}`);
            }
          }}
          style={{
            display: 'flex',
            background: 'var(--alo-oscuro)',
            border: '1px solid var(--alo-borde)',
            borderRadius: '12px',
            padding: '16px',
            gap: '16px',
            cursor: (producto.liberado === 'si' || producto.liberado) ? 'default' : 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--alo-verde-claro)'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--alo-borde)'}
        >
          {/* Image Left Side */}
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '8px', 
            overflow: 'hidden',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--alo-borde)'
          }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Content Right Side */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <h3 style={{ 
              margin: '0 0 4px', 
              fontSize: '15px', 
              fontWeight: 600, 
              color: 'var(--alo-blanco)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {producto.nombre}
            </h3>
            
            {(producto.liberado !== 'si' && !producto.liberado) && (
              <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--alo-verde-claro)', fontWeight: 600 }}>
                ${(producto.precio || 0).toLocaleString('es-CL')}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'auto' }}>
              <Tag color={obtenerColorPorGrado(producto.grado)} style={{ margin: 0, border: 'none' }}>
                {producto.grado || 'Básico'}
              </Tag>
              {producto.video_si === 'si' && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(producto.video_link);
                  }}
                  style={{ fontSize: '11px', color: 'var(--alo-gris-claro)', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Ver Demo
                </span>
              )}
            </div>

            {/* Buttons Bottom */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              {(producto.liberado === 'si' || producto.liberado) ? (
                <button
                  style={{
                    background: 'var(--alo-verde)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDescargar(producto);
                  }}
                >
                  Descargar Gratis
                </button>
              ) : (
                <>
                  <button
                    style={{
                      background: 'var(--alo-verde)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComprar(producto);
                    }}
                  >
                    Comprar
                  </button>
                  <button
                    style={{
                      background: 'transparent',
                      color: 'var(--alo-verde-claro)',
                      border: '1px solid var(--alo-verde-claro)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(producto);
                    }}
                  >
                    <FiShoppingCart size={16} />
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
