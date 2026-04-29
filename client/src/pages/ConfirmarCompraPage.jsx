import React, { useState, useEffect } from 'react';
import { Button, Breadcrumb, App, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { CreditCardOutlined, SafetyCertificateOutlined, ShoppingCartOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { loginWithGoogle } from '../lib/firebase';
import './ConfirmarCompraPage.css';

const ConfirmarCompraPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingMp, setLoadingMp] = useState(false);
  const { message, modal } = App.useApp();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];

    const productos = carrito.map((item, idx) => ({
      id_articulo: item.id_articulo || item.id || `item-${idx}`,
      id: item.id || item.id_articulo,
      nombre: item.nombre || 'Producto sin nombre',
      precio: item.precio || 0,
      imagen: item.imagen || '',
      cantidad: item.cantidad || 1,
    }));

    setProductosCarrito(productos);

    const precioTotal = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(precioTotal);
  }, []);

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };

  const procesarPago = async () => {
    if (!user) {
      modal.confirm({
        title: 'Iniciar Sesión',
        content: 'Para proceder al pago y asociar la compra a tu cuenta, debes iniciar sesión con Google.',
        okText: 'Iniciar Sesión',
        cancelText: 'Cancelar',
        centered: true,
        onOk: async () => {
          await loginWithGoogle();
        },
      });
      return;
    }

    try {
      setLoadingMp(true);
      
      const emailUsuario = user.email;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: productosCarrito, email: emailUsuario }),
      });

      if (!response.ok) throw new Error('Error al crear la preferencia');

      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('No se recibió la URL de pago');
      }
    } catch (error) {
      console.error(error);
      message.error('Hubo un problema al conectar con Mercado Pago');
      setLoadingMp(false);
    }
  };

  return (
    <div className="confirmar-compra-wrapper">
      {/* Cabecera unificada */}
      <div className="confirmar-compra-header">
        <h1 className="confirmar-compra-title">Confirmar Compra</h1>
        <Breadcrumb
          className="confirmar-compra-breadcrumb"
          separator={<span style={{ color: 'var(--alo-gris)', opacity: 0.5 }}>/</span>}
          items={[
            { title: <Link to="/tienda" style={{ color: 'var(--alo-gris-claro)', textDecoration: 'none' }}>Catálogo</Link> },
            { title: <Link to="/carrito" style={{ color: 'var(--alo-gris-claro)', textDecoration: 'none' }}>Carrito</Link> },
            { title: <span style={{ color: 'var(--alo-verde-claro)' }}>Confirmar</span> }
          ]}
        />
      </div>

      {/* Layout de dos columnas */}
      <div className="confirmar-compra-layout">
        
        {/* Panel Izquierdo: Lista de Productos */}
        <div className="confirmar-panel-izquierdo">
          <div className="checkout-card">
            <div className="checkout-card-header">
              <ShoppingCartOutlined style={{ fontSize: '22px', color: 'var(--alo-verde-claro)' }} />
              <h2>Detalle de los productos</h2>
            </div>

            <div className="checkout-items-list">
              {productosCarrito.map((item) => (
                <div key={item.id_articulo} className="checkout-item">
                  <div className="checkout-item-info">
                    <Link to={`/producto/${item.id}`} className="checkout-item-name-link">
                      <span className="checkout-item-name">{item.nombre}</span>
                    </Link>
                    <span className="checkout-item-qty">Cantidad: {item.cantidad}</span>
                  </div>
                  <span className="checkout-item-price">{formatearMonto(item.precio * item.cantidad)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Derecho: Pago Seguro */}
        <div className="confirmar-panel-derecho">
          <div className="checkout-card">
            <div className="checkout-card-header">
              <SafetyCertificateOutlined style={{ fontSize: '22px', color: 'var(--alo-verde-claro)' }} />
              <h2>Resumen Seguro</h2>
            </div>

            {user && (
              <div style={{ padding: '0 0 16px', color: 'var(--alo-gris)', fontSize: '13px' }}>
                Conectado como: <span style={{ color: 'var(--alo-blanco)' }}>{user.email}</span>
              </div>
            )}

            <div className="checkout-total-section">
              <div className="checkout-total-row">
                <span className="checkout-total-label">Subtotal</span>
                <span className="checkout-total-value">{formatearMonto(total)}</span>
              </div>
              <div className="checkout-total-row total-final">
                <span className="checkout-total-label">Total a pagar</span>
                <span className="checkout-total-value accent">{formatearMonto(total)}</span>
              </div>
            </div>
            
            <div className="checkout-action-section">
              <Button
                type="primary"
                size="large"
                className="btn-checkout"
                icon={user ? <CreditCardOutlined /> : <GoogleOutlined />}
                block
                loading={loadingMp || user === undefined}
                onClick={procesarPago}
              >
                {user === undefined ? "Verificando sesión..." : user ? "Pagar con Mercado Pago" : "Iniciar sesión para Pagar"}
              </Button>
              <p className="checkout-secure-text">Serás redirigido a la plataforma oficial y 100% segura de Mercado Pago.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmarCompraPage;
