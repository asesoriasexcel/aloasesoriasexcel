import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Spin, Input, Slider, Checkbox, Breadcrumb } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FiShoppingCart, FiFilter, FiX } from 'react-icons/fi';
import ProductosGrid from '../components/Tienda/ProductosGrid';
import { getProducts } from '../lib/api';
import tiendaCategorias from '../data/tiendaCategorias';
import './TiendaPage.css';

const TiendaPage = () => {
  const navigate = useNavigate();
  const { id_categoria } = useParams();
  const location = useLocation();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCats, setSelectedCats] = useState(id_categoria ? [id_categoria] : []);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (id_categoria && !selectedCats.includes(id_categoria)) {
      setSelectedCats([id_categoria]);
    }
  }, [id_categoria]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProductos(data);
        const maxPrice = Math.max(...data.map(p => p.precio || 0));
        setPriceRange([0, maxPrice > 0 ? maxPrice : 100000]);
      } catch {
        setErrorMessage('Error al conectar con el servidor.');
        setIsErrorModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const convertirEnlaceEmbed = (link) => {
    if (link?.includes('youtube.com/watch?v=')) {
      return `https://www.youtube.com/embed/${link.split('v=')[1]}`;
    }
    return link;
  };

  const productosFiltrados = productos.filter((p) => {
    // 1. Liberados filter
    if (location.pathname === '/tienda/liberados' && !p.liberado) return false;
    
    // 2. Search Term
    if (searchTerm && !p.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // 3. Price Range
    const price = p.precio || 0;
    if (price < priceRange[0] || price > priceRange[1]) return false;

    // 4. Categories Checkboxes
    if (selectedCats.length > 0) {
      if (!selectedCats.includes(String(p.id_categoria))) return false;
    }

    return true;
  });

  const handleOpenModal = (videoLink) => {
    if (!videoLink) return;
    setCurrentVideoLink(convertirEnlaceEmbed(videoLink));
    setIsModalVisible(true);
  };

  const handleAddToCart = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    if (carrito.find((item) => item.id === producto.id)) {
      setErrorMessage('No se puede añadir más de una unidad del mismo artículo.');
      setIsErrorModalVisible(true);
      return;
    }
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('ae-carrito', JSON.stringify(carrito));
    setAddedProductName(producto.nombre);
    setIsConfirmModalVisible(true);
    window.dispatchEvent(new Event('storage')); // Trigger cart badge update
  };

  const onCategoryCheck = (id, checked) => {
    if (checked) {
      setSelectedCats([...selectedCats, id]);
    } else {
      setSelectedCats(selectedCats.filter(c => c !== id));
    }
  };

  return (
    <>
      <Helmet>
        <title>Catálogo | Aló Asesorías Excel</title>
        <meta name="description" content="Catálogo de productos y herramientas de Excel para educación y empresas." />
        <link rel="canonical" href="https://aloasesoriasexcel.cl/tienda" />
      </Helmet>
      <div className="tienda-page-wrapper">
        
        {/* Cabecera superior simple */}
      <div className="tienda-header-container">
        <h1 className="tienda-title-main">
          {location.pathname === '/tienda/liberados' ? 'Productos Gratuitos' : 'Catálogo'}
          <span className="tienda-title-count">
            ({productosFiltrados.length})
          </span>
        </h1>
        <Breadcrumb
          className="tienda-breadcrumb"
          separator={<span style={{ color: 'var(--alo-gris)', opacity: 0.5 }}>/</span>}
          items={[
            { title: <Link to="/tienda" style={{ color: 'var(--alo-gris-claro)' }}>Catálogo</Link> },
            { title: <span style={{ color: 'var(--alo-verde-claro)' }}>{location.pathname === '/tienda/liberados' ? 'Gratuitos' : 'Todos'}</span> }
          ]}
        />
      </div>

      {/* Mobile: barra búsqueda + botón filtros */}
      <div className="tienda-mobile-searchbar">
        <Input
          prefix={<SearchOutlined style={{ color: 'var(--alo-gris)', marginRight: '8px' }} />}
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ background: 'var(--alo-oscuro)', borderColor: 'var(--alo-borde)', color: 'var(--alo-blanco)' }}
        />
        <button
          className={`tienda-filter-btn${filtersOpen ? ' is-active' : ''}${selectedCats.length > 0 && !filtersOpen ? ' has-filters' : ''}`}
          onClick={() => {
            if (selectedCats.length > 0 && !filtersOpen) {
              setSelectedCats([]);
            } else {
              setFiltersOpen(v => !v);
            }
          }}
          aria-label={selectedCats.length > 0 && !filtersOpen ? 'Quitar filtros' : 'Filtros'}
        >
          {filtersOpen ? (
            <FiX size={18} />
          ) : selectedCats.length > 0 ? (
            <>
              <FiX size={15} />
              <span className="tienda-filter-clear-label">Quitar filtro</span>
            </>
          ) : (
            <FiFilter size={18} />
          )}
        </button>
      </div>

      <div className="tienda-layout">

        {/* Left Sidebar: Filters */}
        <aside className={`tienda-filters-sidebar${filtersOpen ? ' is-open' : ''}`}>
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--alo-blanco)', marginBottom: '16px', fontWeight: 600 }}>Rango de Precio</h3>
            <Slider 
              range 
              min={0} 
              max={30000} 
              step={1000}
              value={priceRange} 
              onChange={setPriceRange}
              tooltip={{ formatter: v => `$${v.toLocaleString('es-CL')}` }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--alo-gris)', fontSize: '12px', marginTop: '8px' }}>
              <span>${priceRange[0].toLocaleString('es-CL')}</span>
              <span>${priceRange[1].toLocaleString('es-CL')}</span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', color: 'var(--alo-blanco)', marginBottom: '16px', fontWeight: 600 }}>Categorías</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tiendaCategorias.map(cat => {
                const count = productos.filter(p => String(p.id_categoria) === String(cat.id)).length;
                return (
                  <Checkbox 
                    key={cat.id} 
                    checked={selectedCats.includes(String(cat.id))}
                    onChange={e => onCategoryCheck(String(cat.id), e.target.checked)}
                    style={{ color: 'var(--alo-gris)' }}
                  >
                    {cat.nombre} <span style={{ opacity: 0.7, fontSize: '13px', marginLeft: '4px' }}>({count})</span>
                  </Checkbox>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Main Content */}
        <main className="tienda-main-content">
          
          <div className="tienda-desktop-search" style={{ marginBottom: '24px' }}>
            <Input
              prefix={<SearchOutlined style={{ color: 'var(--alo-gris)', marginRight: '8px' }} />}
              placeholder="Buscar producto por nombre..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '400px', maxWidth: '100%', background: 'var(--alo-oscuro)', borderColor: 'var(--alo-borde)', color: 'var(--alo-blanco)' }}
            />
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <Spin size="large" />
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--alo-gris)' }}>
              <p>No se encontraron productos con estos filtros.</p>
            </div>
          ) : (
            <ProductosGrid
              productos={productosFiltrados}
              onAddToCart={handleAddToCart}
              onOpenModal={handleOpenModal}
            />
          )}

        </main>
      </div>

      {/* Modal video */}
      <Modal
        className="modal-tienda-grid-video"
        open={isModalVisible}
        onCancel={() => { setIsModalVisible(false); setCurrentVideoLink(null); }}
        footer={null}
        centered
        width="80%"
        styles={{ body: { padding: 0 } }}
      >
        {currentVideoLink && (
          <iframe
            width="100%"
            height="500px"
            src={currentVideoLink}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video Demo"
          />
        )}
      </Modal>

      {/* Modal confirmación carrito */}
      <Modal
        open={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={null}
        centered
      >
        <div className="confirmar-anadido">
          <FaCheckCircle style={{ color: 'var(--alo-verde-claro)', fontSize: '32px', marginBottom: '16px' }} />
          <p>¡Has añadido "{addedProductName}" al carrito!</p>
          <div className="tienda-modal-actions">
            <Button onClick={() => setIsConfirmModalVisible(false)}>Seguir comprando</Button>
            <Button
              type="primary"
              className="btn-verde"
              icon={<FiShoppingCart />}
              onClick={() => navigate('/carrito')}
            >
              Ir al carrito
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal error */}
      <Modal
        open={isErrorModalVisible}
        onCancel={() => setIsErrorModalVisible(false)}
        footer={null}
        centered
      >
        <div className="error-anadido">
          <FaExclamationCircle style={{ color: 'red', fontSize: '32px', marginBottom: '16px' }} />
          <p>{errorMessage}</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <Button onClick={() => setIsErrorModalVisible(false)}>Aceptar</Button>
          </div>
        </div>
      </Modal>
    </div>
    </>
  );
};

export default TiendaPage;
