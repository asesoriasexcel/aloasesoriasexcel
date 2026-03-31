import React, { useState, useEffect } from 'react';
import { Tag, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PiMedalLight } from "react-icons/pi";
import { getProducts } from '../../../lib/api';
import './ProductoDestacado.css';

const ProductoDestacado = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const data = await getProducts();
        // Filtrar destacados si el backend no lo hizo, o simplemente usar los que vengan marcados
        setProductos(data.filter(p => p.destacado));
      } catch (err) {
        console.error("Error cargando destacados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestacados();
  }, []);

  const convertirEnlaceEmbed = (link) => {
    if (link && link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link;
  };

  const manejarCompra = (id) => {
    navigate(`/producto/${id}`);
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Spin size="large" />
    </div>
  );

  if (productos.length === 0) return null;

  return (
    <section className="productos-section seccion">
      <div className="centered-content">
        <div className="seccion-encabezado-izq">
          <div className="header-izq">
            <PiMedalLight className="productos-icon" /> 
            <h2>Productos Destacados</h2>
          </div>
        </div>

        <div className="contenido productos-sheet">
          {productos.map((producto, index) => (
            <div
              className={`productos-content ${index === productos.length - 1 ? 'ultimo-producto' : ''}`}
              key={producto.id}
            >
              <div className="productos-column">
                <h2><span style={{ color: 'rgb(230, 230, 230)', fontWeight: '500' }}>Planilla</span> {producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p style={{ color: 'var(--happy)' }}>Este producto cuenta con 2 licencias de uso para diferentes equipos.</p>
                <DescripcionLarga descripcion_larga={producto.descripcion_larga} />
                <div className="button-group">
                  <button 
                    className="action-button btn-primary btn-azul"
                    onClick={() => manejarCompra(producto.id)}
                  >
                    Comprar
                  </button>
                  <p className="precio">${Number(producto.precio).toLocaleString('es-CL')} CLP</p>
                </div>
              </div>
              <div className="productos-column">
                <div className="tag-container">
                  {producto.video_link && (
                    <Tag color="blue" className="tag-label">Video Demostrativo</Tag>
                  )}
                </div>
                {producto.video_link ? (
                  <iframe
                    src={convertirEnlaceEmbed(producto.video_link)}
                    title={`Video de ${producto.nombre}`}
                    className="productos-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  producto.imagen && <img 
                    src={producto.imagen} 
                    alt={`Imagen de ${producto.nombre}`} 
                    className="productos-image" 
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DescripcionLarga = ({ descripcion_larga }) => {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  return (
    <div className="btn-vermas">
      {mostrarDescripcion && <p>{descripcion_larga}</p>}
      <button 
        onClick={() => setMostrarDescripcion(!mostrarDescripcion)} 
        className="ver-mas-btn"
      >
        {mostrarDescripcion ? "Ver menos" : "Leer más"}
      </button>
    </div>
  );
};

export default ProductoDestacado;
