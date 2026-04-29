import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Input, Popconfirm, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import './CarritoPage.css';

const CarritoPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    const productos = carrito.map((item, idx) => {
      // Usamos directamente los datos guardados en localStorage
      return {
        id_articulo: item.id_articulo || item.id || `item-${idx}`, // Fallback if corrupt
        id: item.id || item.id_articulo,
        nombre: item.nombre || 'Producto sin nombre',
        precio: item.precio || 0,
        imagen: item.imagen || '',
        cantidad: item.cantidad || 1,
      };
    });
    setProductosCarrito(productos);
  };

  const calcularResumen = () => {
    const precioTotal = productosCarrito.reduce((acc, producto) => acc + (producto.precio || 0) * producto.cantidad, 0);
    return { precioTotal };
  };

  const resumen = calcularResumen();

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto || 0);
  };

  const handleCheckboxChange = (e) => {
    setTerminosAceptados(e.target.checked);
  };

  const eliminarArticulo = (id) => {
    const carritoActualizado = productosCarrito.filter(p => String(p.id) !== String(id));
    localStorage.setItem('ae-carrito', JSON.stringify(carritoActualizado.map(({ id_articulo, cantidad, id, nombre, precio, imagen }) => ({ id_articulo, cantidad, id, nombre, precio, imagen }))));
    setProductosCarrito(carritoActualizado);
    window.dispatchEvent(new Event('storage'));
  };



  return (
    <div className="carrito-page carrito-wrapper">
      
      {/* Cabecera */}
      <div className="carrito-header">
        <h1 className="carrito-page-title">Carrito</h1>
        <Breadcrumb
          separator={<span style={{ color: 'var(--alo-gris)', opacity: 0.5 }}>/</span>}
          items={[
            { title: <Link to="/tienda" style={{ color: 'var(--alo-gris-claro)', textDecoration: 'none' }}>Catálogo</Link> },
            { title: <span style={{ color: 'var(--alo-verde-claro)' }}>Carrito</span> }
          ]}
        />
      </div>

      <div className="carrito-layout">
        
        {/* Panel Izquierdo: Lista de Productos */}
        <div className="carrito-panel-izquierdo">
          <h2 style={{ fontSize: '16px', color: 'var(--alo-blanco)', margin: '0 0 24px', fontWeight: 600 }}>Productos en el carrito</h2>
          
          {productosCarrito.length === 0 ? (
            <p style={{ color: 'var(--alo-gris)', textAlign: 'center', padding: '40px 0' }}>No tienes productos en tu carrito.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {productosCarrito.map((producto, idx) => (
                <div key={producto.id_articulo || idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: idx !== productosCarrito.length - 1 ? '1px solid var(--alo-borde)' : 'none',
                  gap: '12px',
                  flexWrap: 'nowrap'
                }}>
                  {/* Imagen + Info: clickeables → detalle del producto */}
                  <Link
                    to={`/producto/${producto.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, textDecoration: 'none' }}
                  >
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--alo-borde)' }}>
                      <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: 'var(--alo-blanco)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.color = 'var(--alo-verde-claro)'}
                        onMouseOut={e => e.currentTarget.style.color = 'var(--alo-blanco)'}
                      >
                        {producto.nombre}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--alo-gris)' }}>
                        {formatearMonto(producto.precio)}
                      </p>
                    </div>
                  </Link>

                  {/* Acciones */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '40px' }}>
                    
                    <Popconfirm
                        title="¿Eliminar del carrito?"
                        onConfirm={() => eliminarArticulo(producto.id)}
                        okText="Eliminar"
                        cancelText="Cancelar"
                        placement="topRight"
                      >
                        <DeleteOutlined 
                          style={{ color: '#ef4444', fontSize: '18px', cursor: 'pointer', transition: 'opacity 0.2s' }} 
                          onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
                          onMouseOut={e => e.currentTarget.style.opacity = '1'}
                        />
                      </Popconfirm>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel Derecho: Resumen */}
        <div className="carrito-panel-derecho">
          
          {/* Tarjeta de Resumen */}
          <div style={{
            background: 'var(--alo-oscuro2)', 
            borderRadius: '8px', 
            border: '1px solid var(--alo-borde)', 
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '16px', color: 'var(--alo-blanco)', margin: '0 0 24px', fontWeight: 600 }}>Resumen de Compra</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--alo-gris)', fontSize: '14px' }}>
                <span>Sub-total</span>
                <span>{formatearMonto(resumen.precioTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--alo-gris)', fontSize: '14px' }}>
                <span>Descuento</span>
                <span>$0</span>
              </div>
              <div style={{ height: '1px', background: 'var(--alo-borde)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--alo-blanco)', fontSize: '16px', fontWeight: 600 }}>
                <span>Total</span>
                <span style={{ color: 'var(--alo-verde-claro)' }}>{formatearMonto(resumen.precioTotal)}</span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Checkbox onChange={handleCheckboxChange} style={{ color: 'var(--alo-gris)' }}>
                Acepto los <Link to="/terminoscondiciones" target="_blank" style={{ color: 'var(--alo-verde-claro)', textDecoration: 'none' }}>términos y condiciones</Link>
              </Checkbox>
            </div>

            <Button 
              type="primary" 
              disabled={!terminosAceptados || productosCarrito.length === 0}
              onClick={() => navigate('/confirmacompra')}
              style={{ 
                width: '100%', 
                height: '44px', 
                borderRadius: '6px', 
                background: (terminosAceptados && productosCarrito.length > 0) ? 'var(--alo-verde)' : undefined, 
                fontWeight: 600 
              }}
            >
              Proceder al pago
            </Button>
          </div>

          {/* Tarjeta Aplicar Código */}
          <div style={{
            background: 'var(--alo-oscuro2)', 
            borderRadius: '8px', 
            border: '1px solid var(--alo-borde)', 
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '15px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 600 }}>Aplicar Cupón</h3>
            <Input 
              placeholder="Ingresa tu código" 
              style={{ 
                marginBottom: '16px', 
                height: '40px',
                background: 'var(--alo-oscuro)', 
                borderColor: 'var(--alo-borde)', 
                color: 'var(--alo-blanco)' 
              }} 
            />
            <Button 
              style={{ 
                width: '100%', 
                height: '40px',
                borderRadius: '6px', 
                background: 'transparent', 
                borderColor: 'var(--alo-verde)', 
                color: 'var(--alo-verde)', 
                fontWeight: 500 
              }}
            >
              Aplicar Código
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
