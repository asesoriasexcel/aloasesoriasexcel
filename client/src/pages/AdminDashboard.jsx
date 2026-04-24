import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Tag, Space, Typography, message, Spin, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { getProducts } from '../lib/api';
import { auth } from '../lib/firebase';
import tiendaCategorias from '../data/tiendaCategorias';
import AdminPageHeader from '../layouts/admin/AdminPageHeader';
import AdminToolbar from '../layouts/admin/AdminToolbar';
import AdminStats from '../layouts/admin/AdminStats';
import ProductCard from '../layouts/admin/ProductCard';

const { Text } = Typography;

const VIEW_TABLE = 'table';
const VIEW_GRID  = 'grid';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [view, setView]         = useState(VIEW_TABLE);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      message.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        message.success('Producto eliminado');
        fetchProducts();
        window.dispatchEvent(new Event('adminProductsChanged'));
      }
    } catch {
      message.error('Error al eliminar');
    }
  };

  const columns = [
    {
      title: 'Producto',
      key: 'nombre',
      render: (_, r) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: 'var(--alo-blanco)', fontSize: 14 }}>{r.nombre}</Text>
          <Text style={{ color: 'var(--alo-gris)', fontSize: 11, fontFamily: 'monospace' }}>{r.id}</Text>
        </Space>
      ),
    },
    {
      title: 'Categoría',
      key: 'categoria',
      render: (_, r) => {
        const cat = tiendaCategorias.find((c) => String(c.id) === String(r.id_categoria));
        return <Tag color="green">{cat?.nombre ?? 'S/N'}</Tag>;
      },
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (p) => (
        <Text style={{ color: 'var(--alo-verde-claro)', fontWeight: 700 }}>
          {p != null ? `$${p.toLocaleString('es-CL')}` : '—'}
        </Text>
      ),
    },
    {
      title: 'Estado',
      key: 'estado',
      render: (_, r) => (
        <Space size={4}>
          {r.disponible ? <Tag color="success">Disponible</Tag> : <Tag color="default">Pausado</Tag>}
          {r.liberado && <Tag color="gold">Gratis</Tag>}
        </Space>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      align: 'right',
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            ghost
            onClick={() => navigate(`/admin/producto/editar/${r.id}`)}
            style={{ color: 'var(--alo-gris-claro)', borderColor: 'rgba(255,255,255,0.12)' }}
          />
          <Popconfirm
            title="¿Eliminar este producto?"
            description="Esta acción no se puede deshacer."
            onConfirm={() => handleDelete(r.id)}
            okText="Eliminar"
            cancelText="Cancelar"
            placement="topRight"
          >
            <Button size="small" danger icon={<DeleteOutlined />} ghost />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const statsItems = [
    { label: 'Total productos',  value: products.length },
    { label: 'Disponibles',      value: products.filter((p) => p.disponible).length, variant: 'accent' },
    { label: 'Gratuitos',        value: products.filter((p) => p.liberado).length,   variant: 'gold' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      
      {/* Top Title like "Shop List" */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--admin-text-primary)' }}>
          Catálogo de productos
        </h1>
        {/* Breadcrumb equivalent */}
        <div style={{ fontSize: '13px', color: 'var(--admin-text-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="/" style={{ color: 'var(--admin-text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--admin-text-primary)'} onMouseOut={e => e.target.style.color = 'var(--admin-text-subtle)'}>Inicio</a>
          <span>{'>'}</span>
          <a href="/admin" style={{ color: 'var(--admin-text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--admin-text-primary)'} onMouseOut={e => e.target.style.color = 'var(--admin-text-subtle)'}>Admin</a>
          <span>{'>'}</span>
          <span style={{ color: 'var(--admin-text-primary)', fontWeight: 500 }}>Catálogo</span>
        </div>
      </div>

      <div className="admin-content-panel admin-content-panel--padded" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Add new button inside the panel, top left */}
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="btn-verde"
            onClick={() => navigate('/admin/producto/nuevo')}
            style={{ borderRadius: '6px', fontWeight: 500 }}
          >
            Nuevo producto
          </Button>
        </div>

        {/* Grid of cards */}
        {loading ? (
          <div className="admin-loading-state">
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-state__icon"><AppstoreOutlined /></div>
            <p className="admin-empty-state__title">Sin productos</p>
            <p className="admin-empty-state__desc">Crea el primer producto con el botón de arriba.</p>
          </div>
        ) : (
          <div className="admin-product-grid" style={{ padding: 0 }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
