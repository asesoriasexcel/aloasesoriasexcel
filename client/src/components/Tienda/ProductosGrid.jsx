import React from 'react';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { trackDownload } from '../analytics';
import './ProductoGrid.css';

const obtenerColorPorGrado = (grado) => {
  switch (grado) {
    case 'Simple':
      return 'default';
    case 'Full':
      return 'gold';
    case 'Pro':
      return 'cyan';
    case 'Master':
      return 'red';
    case 'Leyenda':
      return 'purple';
    default:
      return 'default';
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
            borderRadius: '8px',
            padding: 0, // Removed padding from card
            gap: 0, // Gap is now handled by internal padding
            cursor: (producto.liberado === 'si' || producto.liberado) ? 'default' : 'pointer',
            transition: 'border-color 0.2s',
            overflow: 'hidden' // Ensure image doesn't overflow corners
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--alo-verde-claro)'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--alo-borde)'}
        >
          {/* Image Left Side (Flush) */}
          <div style={{
            width: '110px',
            height: 'auto',
            minHeight: '120px',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
          }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '33%',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px'
              }}
            />
          </div>

          {/* Content Right Side (Padded) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            padding: '12px' // Padding applied here
          }}>
            {/* Grade Top Row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2px' }}>
              <Tag
                color={obtenerColorPorGrado(producto.grado)}
                bordered={false}
                style={{
                  margin: 0,
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '0px 8px',
                  background: 'transparent',
                  border: `1px solid ${obtenerColorPorGrado(producto.grado)}`,
                  flexShrink: 0
                }}
              >
                {producto.grado || 'Simple'}
              </Tag>
            </div>

            <h3 style={{
              margin: 0,
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--alo-blanco)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {producto.nombre}
            </h3>

            {/* Short Description (Resumen corto) */}
            <p style={{
              margin: '4px 0 8px',
              fontSize: '13px',
              color: 'var(--alo-gris-claro)',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {producto.descripcion}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'auto' }}>
              {/* Other info */}
              {producto.video_si === 'si' && (
                <div style={{ marginBottom: '2px' }}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(producto.video_link);
                    }}
                    style={{ fontSize: '12px', color: 'var(--alo-verde-claro)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Ver Demo
                  </span>
                </div>
              )}

              {producto.tags && producto.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {producto.tags.map(tag => (
                    <Tag
                      key={tag}
                      bordered={false}
                      color="default"
                      style={{
                        fontSize: '11px',
                        margin: 0,
                        background: 'transparent',
                        padding: 0
                      }}
                    >
                      #{tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Price and Buttons Bottom Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '12px',
              gap: '8px'
            }}>
              {/* Price Left */}
              <div>
                {(producto.liberado !== 'si' && !producto.liberado) ? (
                  <span style={{ fontSize: '15px', color: 'var(--alo-verde-claro)', fontWeight: 700 }}>
                    ${(producto.precio || 0).toLocaleString('es-CL')}
                  </span>
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--alo-verde)', fontWeight: 600 }}>Gratis</span>
                )}
              </div>

              {/* Buttons Right */}
              <div style={{ display: 'flex', gap: '6px' }}>
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
                    Descargar
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
        </div>
      ))}
    </div>
  );
};

export default ProductosGrid;
