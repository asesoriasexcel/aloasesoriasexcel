import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Tag, Spin, Breadcrumb } from 'antd';
import { RiFileExcel2Line } from "react-icons/ri";
import { FaYoutube } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { getProductById } from '../lib/api';
import './ProductoPage.css';

const { Text } = Typography;

const obtenerColorPorGrado = (grado) => {
  switch (grado) {
    case 'Simple':   return 'default';
    case 'Full':     return 'gold';
    case 'Pro':      return 'cyan';
    case 'Master':   return 'red';
    case 'Leyenda':  return 'purple';
    default:         return 'default';
  }
};

const gradoBorderColor = (grado) =>
  obtenerColorPorGrado(grado) === 'default' ? '#555' : 'currentColor';

const ProductoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await getProductById(id);
        setProducto(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="producto-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="producto-page-wrapper">
        <Link to="/tienda" className="producto-volver">← Volver al catálogo</Link>
        <p style={{ color: 'var(--alo-gris)', fontSize: '15px' }}>Producto no encontrado.</p>
      </div>
    );
  }

  const convertirEnlaceEmbed = (link) => {
    if (!link) return '';
    let videoId = '';
    if (link.includes("youtube.com/watch?v="))      videoId = link.split("v=")[1].split("&")[0];
    else if (link.includes("youtu.be/"))             videoId = link.split("youtu.be/")[1].split("?")[0];
    else if (link.includes("youtube.com/embed/"))    videoId = link.split("embed/")[1].split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : link;
  };

  const handleAddToCart = () => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    if (!carrito.find(item => item.id === producto.id)) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('ae-carrito', JSON.stringify(carrito));
      window.dispatchEvent(new Event('storage'));
    }
    navigate('/carrito');
  };

  const gradoTagStyle = {
    textTransform: 'uppercase',
    fontSize: '11px',
    fontWeight: 800,
    background: 'transparent',
    border: `1px solid ${gradoBorderColor(producto.grado)}`,
    margin: 0,
  };

  return (
    <div className="producto-page-wrapper">

      {/* Header: título + breadcrumb */}
      <div className="producto-page-header">
        <h1 className="producto-page-title">Detalle del Producto</h1>
        <Breadcrumb
          separator={<span style={{ color: 'var(--alo-gris)', opacity: 0.5 }}>/</span>}
          items={[
            { title: <Link to="/tienda" style={{ color: 'var(--alo-gris-claro)', textDecoration: 'none' }}>Catálogo</Link> },
            { title: <span style={{ color: 'var(--alo-verde-claro)' }}>{producto.nombre}</span> }
          ]}
        />
      </div>

      {/* Card principal */}
      <div className="producto-card-main">

        {/* Columna izquierda: media */}
        <div className="producto-col-media">

          {/* Video */}
          {producto.video_link ? (
            <div className="producto-video-wrapper">
              <iframe
                className="producto-video-iframe"
                src={convertirEnlaceEmbed(producto.video_link)}
                title="Video demostrativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="producto-video-placeholder">
              <Text style={{ color: 'var(--alo-gris-claro)', fontSize: '13px' }}>Sin video disponible</Text>
            </div>
          )}

          {/* ── MÓVIL ONLY: versión + grado (izq) · demo (der) ── */}
          <div className="producto-meta-mobile">
            <div className="producto-meta-left">
              {producto.version && (
                <span className="producto-meta-version">{producto.version}</span>
              )}
              <Tag
                color={obtenerColorPorGrado(producto.grado)}
                bordered={false}
                style={gradoTagStyle}
              >
                {producto.grado}
              </Tag>
            </div>
            {producto.demo_link && (
              <div className="neon-demo-tag" onClick={() => window.open(producto.demo_link, '_blank')}>
                Demo Disponible
              </div>
            )}
          </div>

          {/* ── MÓVIL ONLY: nombre con label ── */}
          <div className="producto-nombre-section-mobile">
            <span className="producto-spec-label">Nombre</span>
            <h2 className="producto-info-nombre">{producto.nombre}</h2>
          </div>

          {/* ── MÓVIL ONLY: descripción ── */}
          {producto.descripcion && (
            <div className="producto-desc-mobile">
              <span className="producto-spec-label">Descripción</span>
              <p className="producto-desc-mobile-text">{producto.descripcion}</p>
            </div>
          )}

          {/* Label YouTube (solo desktop) */}
          <div className="producto-media-label producto-only-desktop">
            <FaYoutube />
            <span>Video Demostrativo / Tutorial</span>
          </div>

          {/* Tags (solo desktop) */}
          {producto.tags && producto.tags.length > 0 && (
            <div className="producto-tags-list producto-only-desktop">
              {producto.tags.map(tag => (
                <Tag key={tag} bordered={false} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--alo-gris-claro)', fontSize: '12px' }}>
                  #{tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: info */}
        <div className="producto-col-info">

          {/* Tags categoría + grado + demo (solo desktop) */}
          <div className="producto-info-tags producto-only-desktop">
            <Tag color="default" bordered={false} style={{ fontSize: '10px', fontWeight: 700, opacity: 0.6, margin: 0 }}>
              {producto.categoria_nombre}{producto.subcategoria_nombre && ` / ${producto.subcategoria_nombre}`}
            </Tag>
            <Tag color={obtenerColorPorGrado(producto.grado)} bordered={false} style={gradoTagStyle}>
              {producto.grado}
            </Tag>
            {producto.demo_link && (
              <div className="neon-demo-tag" onClick={() => window.open(producto.demo_link, '_blank')}>
                Demo Disponible
              </div>
            )}
          </div>

          {/* Nombre (solo desktop) */}
          <h2 className="producto-info-nombre producto-only-desktop">{producto.nombre}</h2>

          {/* Descripción corta (solo desktop) */}
          {producto.descripcion && (
            <p className="producto-info-desc-corta producto-only-desktop">{producto.descripcion}</p>
          )}

          {/* Badge de licencia — siempre visible */}
          {producto.has_license && (
            <div className="producto-license-badge">
              <div style={{ color: '#39FF14', fontSize: '20px', flexShrink: 0 }}>
                <RiFileExcel2Line />
              </div>
              <div>
                <span className="producto-license-title">Producto con Licencia</span>
                <span className="producto-license-desc">
                  Incluye licencia de uso para{' '}
                  <span style={{ color: '#39FF14' }}>{producto.license_quantity}</span>{' '}
                  {producto.license_type === 'Uso' ? 'equipo(s)' : 'usuario(s)'}.
                </span>
              </div>
            </div>
          )}

          {/* Grid de specs — siempre visible */}
          <div className="producto-specs-grid">
            <div className="producto-spec">
              <span className="producto-spec-label">Requisitos</span>
              <p className="producto-spec-text">{producto.requisitos || 'No especificados'}</p>
            </div>
            <div className="producto-spec">
              <span className="producto-spec-label">Funcionalidades</span>
              <p className="producto-spec-text">{producto.funcionalidades || 'No especificadas'}</p>
            </div>
          </div>

          {/* Descripción larga — siempre visible */}
          {producto.descripcion_larga && (
            <p className="producto-info-desc-larga">{producto.descripcion_larga}</p>
          )}

          {/* Bloque de compra */}
          <div className="producto-purchase-block">
            <div>
              <span className="producto-precio-label">Pago único</span>
              <span className="producto-precio-valor">
                {producto.precio?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<FiShoppingCart />}
              onClick={handleAddToCart}
              className="producto-btn-comprar"
            >
              Comprar
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductoPage;
