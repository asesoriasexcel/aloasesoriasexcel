import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Tag, Image, Alert, Badge, Spin } from 'antd';
import { RiFileExcel2Line } from "react-icons/ri";
import { FaYoutube } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { getProductById } from '../lib/api';
import './ProductoPage.css';

const { Title, Text } = Typography;

const obtenerColorPorGrado = (grado) => {
  switch (grado) {
    case 'estandar':
      return 'green';
    case 'avanzado':
      return 'blue';
    case 'premium':
      return 'red';
    default:
      return 'gray';
  }
};

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

  const carritoCount = (JSON.parse(localStorage.getItem('ae-carrito')) || []).length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="producto-container">
        <div className="volver-tienda">
          <Link to="/tienda" className="volver-tienda-link">
            &larr; Volver a la tienda
          </Link>
        </div>
        <Title level={2}>Producto no encontrado</Title>
      </div>
    );
  }

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(precio);
  };

  const convertirEnlaceEmbed = (link) => {
    if (link && link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link;
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
      navigate('/carrito');
    }
  };

  return (
    <div className="producto-container">
      <div className="volver-tienda">
        <Link to="/tienda" className="volver-tienda-link">
          &larr; Volver a la tienda
        </Link>
        <Link to="/carrito" className="carrito-link">
          <Badge
            count={carritoCount}
            overflowCount={99}
            style={{ backgroundColor: 'var(--especial)' }}
          >
            <FiShoppingCart
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            />
          </Badge>
        </Link>
      </div>

      <div className="producto-card">
        <div className="p-nombre titulo-cabezal">
          <RiFileExcel2Line />
          <h2>Planilla {producto.nombre}</h2>
        </div>

        <Alert
          message="Este producto cuenta con 2 licencias de uso para diferentes equipos."
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }}
        />

        <div className="p-info1">
          <div className="p-galeria-imagen" style={{ display: 'flex', justifyContent: 'center' }}>
            {producto.imagen && (
              <div className="p-imagen">
                <Image
                  alt={producto.nombre}
                  src={producto.imagen}
                  className="producto-imagen"
                  preview={{ src: producto.imagen }}
                />
              </div>
            )}
          </div>

          <div className="p-info">
            <div className="p-tag">
              <div className="p-tag1">
                <span>Versión:</span>
                <Tag color={obtenerColorPorGrado(producto.grado)} style={{ marginLeft: '8px' }}>
                  {producto.grado.toUpperCase()}
                </Tag>
              </div>
            </div>
            <div className="p-nombre titulo-central">
              <RiFileExcel2Line />
              <h2>Planilla {producto.nombre}</h2>
            </div>
            <div className="p-descripcion_larga">
              <p>{producto.descripcion_larga}</p>
            </div>
            <div className="p-precio">
              <p>{formatearPrecio(producto.precio)}</p>
            </div>
            <div className="p-categoria">
              <Text>
                <strong>Categoría:</strong> {producto.categoria_nombre || 'Desconocida'}
              </Text>
            </div>
            <div className="p-botones">
              <Button
                type="primary"
                className="btn-azul"
                onClick={handleAddToCart}
              >
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>

        {producto.video_link && (
          <div id="p-info2" className="p-info2">
            <hr />
            <div className="p-titulovideo">
              <FaYoutube /><h2>Video demostrativo</h2>
            </div>
            <div className="p-video">
              <iframe
                width="100%"
                height="600"
                src={convertirEnlaceEmbed(producto.video_link)}
                title="Video demostrativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoPage;
