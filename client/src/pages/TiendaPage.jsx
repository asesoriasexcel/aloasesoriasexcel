import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Drawer, Modal, Button, Badge, Spin } from 'antd';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import TreeMenu from '../components/Tienda/TreeMenu';
import MenuBar from '../components/Tienda/MenuBar';
import ProductosGrid from '../components/Tienda/ProductosGrid';
import { getProducts, getCategories } from '../lib/api';
import './TiendaPage.css';

const TiendaPage = () => {
  const navigate = useNavigate();
  const { id_categoria, id_subcategoria } = useParams();
  const location = useLocation();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(id_categoria || null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(id_subcategoria || null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Cargar categorías y productos iniciales
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodData, catData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProductos(prodData);
        setCategorias(catData);
      } catch (err) {
        setErrorMessage('Error al conectar con el servidor.');
        setIsErrorModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const convertirEnlaceEmbed = (link) => {
    if (link && link.includes('youtube.com/watch?v=')) {
      const videoId = link.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link;
  };

  useEffect(() => {
    if (id_categoria) {
      setCategoriaSeleccionada(id_categoria);
      setSubcategoriaSeleccionada(null);
      setSelectedMenuId(`cat-${id_categoria}`);
    }
  }, [id_categoria]);

  const onMenuClick = () => setIsDrawerVisible(true);

  const onSelect = (id) => {
    if (!id) return;
    if (id.startsWith('cat-')) {
      const idCat = id.replace('cat-', '');
      setCategoriaSeleccionada(idCat);
      setSubcategoriaSeleccionada(null);
      setSelectedMenuId(id);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    if (location.pathname === '/tienda/liberados') return producto.liberado;
    if (categoriaSeleccionada) return String(producto.categoria) === String(categoriaSeleccionada);
    return true;
  });

  const categoriaNombre = categoriaSeleccionada
    ? categorias.find((cat) => String(cat.id) === String(categoriaSeleccionada))?.nombre
    : null;

  const handleClickTienda = () => {
    setCategoriaSeleccionada(null);
    setSubcategoriaSeleccionada(null);
    setSelectedMenuId(null);
    navigate('/tienda');
  };

  const handleOpenModal = (videoLink) => {
    if (!videoLink) return;
    setCurrentVideoLink(convertirEnlaceEmbed(videoLink));
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setCurrentVideoLink(null);
    setIsModalVisible(false);
  };

  const handleAddToCart = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    const existeEnCarrito = carrito.find((item) => item.id === producto.id);

    if (existeEnCarrito) {
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
  };

  const handleGoToCart = () => navigate('/carrito');

  return (
    <div className="cuerpo-page-container" style={{ display: 'flex' }}>
      <MenuBar onMenuClick={onMenuClick} />

      <Drawer
        title="Categorías"
        placement="left"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        styles={{ body: { padding: 0 } }}
      >
        <TreeMenu
          onSelect={onSelect}
          onMostrarTodo={handleClickTienda}
          selectedId={selectedMenuId}
          categories={categorias}
          products={productos}
        />
      </Drawer>

      <div className="tiendapage-menu">
        <div className="tiendapage-menu-canvas">
          <TreeMenu
            onSelect={onSelect}
            onMostrarTodo={handleClickTienda}
            selectedId={selectedMenuId}
            categories={categorias}
            products={productos}
          />
        </div>
      </div>

      <div className="tiendapage-contenido">
        <div className="tiendapage-contenido-canvas">
          <Breadcrumb
            items={[
              { title: <Link to="/">Inicio</Link> },
              { title: <Link to="/tienda" onClick={handleClickTienda}>Tienda</Link> },
              ...(categoriaNombre ? [{ title: categoriaNombre }] : []),
              ...(location.pathname === '/tienda/liberados' ? [{ title: 'Liberados' }] : []),
            ]}
          />

          <div className="tienda-cabezal">
            <h1 className="titulo-productos">
              {location.pathname === '/tienda/liberados' ? 'Productos Liberados' : 'Tienda de Productos'}
            </h1>
            <div className="tienda-cabezal-badge">
              <Link to="/carrito">
                <Badge
                  count={(JSON.parse(localStorage.getItem('ae-carrito')) || []).length}
                  overflowCount={99}
                  style={{ backgroundColor: 'var(--especial)' }}
                >
                  <FiShoppingCart className="icono-carrito" />
                </Badge>
              </Link>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <ProductosGrid
              productos={productosFiltrados}
              onAddToCart={handleAddToCart}
              onOpenModal={handleOpenModal}
            />
          )}
        </div>
      </div>

      <Modal
        className="modal-tienda-grid-video"
        open={isModalVisible}
        onCancel={handleCloseModal}
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

      <Modal
        open={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={null}
        centered
      >
        <div className="confirmar-anadido">
          <FaCheckCircle />
          <p>¡Has añadido &quot;{addedProductName}&quot; al carrito exitosamente!</p>
          <div className="TiendaPage-modal-icons">
            <Button type="default" onClick={() => setIsConfirmModalVisible(false)}>
              Aceptar
            </Button>
            <Button
              className="btn-naranjoicon"
              icon={<FiShoppingCart className="btnnaranjoicon-icon" />}
              onClick={handleGoToCart}
            >
              Ir al carrito
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={isErrorModalVisible}
        onCancel={() => setIsErrorModalVisible(false)}
        footer={null}
        centered
      >
        <div className="error-anadido">
          <FaExclamationCircle />
          <p>{errorMessage}</p>
          <div className="TiendaPage-modal-icons">
            <Button type="default" onClick={() => setIsErrorModalVisible(false)}>
              Aceptar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TiendaPage;
