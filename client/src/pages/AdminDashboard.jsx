import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Table, Button, Space, Tag, Typography, 
  message, Card, Statistic, Row, Col, Popconfirm, Spin, Breadcrumb 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  ShoppingOutlined, CheckCircleOutlined, 
  GlobalOutlined, ArrowLeftOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getProducts } from '../lib/api';
import { auth } from '../lib/firebase';
import tiendaCategorias from '../data/tiendaCategorias';
import './AdminStyles.css';

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
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
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        message.success('Producto eliminado');
        fetchProducts();
      }
    } catch (error) {
      message.error('Error al eliminar');
    }
  };

  const columns = [
    {
      title: 'Producto',
      key: 'name_info',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: 'var(--tienda-titulo)', fontSize: '15px' }}>{record.nombre}</Text>
          <Text style={{ color: 'var(--alo-gris-claro)', fontSize: '12px' }}>{record.id}</Text>
        </Space>
      ),
    },
    {
      title: 'Categoría',
      key: 'category',
      render: (_, record) => {
        const cat = tiendaCategorias.find(c => String(c.id) === String(record.id_categoria));
        return <Tag color="green">{cat?.nombre || 'S/N'}</Tag>;
      }
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (p) => <Text style={{ color: 'var(--alo-blanco)' }}>${p?.toLocaleString()}</Text>
    },
    {
      title: 'Estados',
      key: 'status',
      render: (_, record) => (
        <Space size="small">
          {record.disponible && <Tag color="success">Disponible</Tag>}
          {record.liberado && <Tag color="gold">Gratis</Tag>}
        </Space>
      )
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => navigate(`/admin/producto/editar/${record.id}`)}
            ghost
            style={{ color: 'var(--alo-blanco)', borderColor: 'rgba(255,255,255,0.2)' }}
          />
          <Popconfirm 
            title="¿Eliminar definitivamente?" 
            onConfirm={() => handleDelete(record.id)} 
            okText="Sí" 
            cancelText="No"
            placement="leftTop"
          >
            <Button danger icon={<DeleteOutlined />} ghost />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (user === undefined) {
    return (
      <div className="cuerpo-page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="Verificando..." />
      </div>
    );
  }

  if (!user || user.email !== 'aloasesoriasexcel@gmail.com') {
    return (
      <div className="cuerpo-page-container admin-no-access">
        <div className="tiendapage-contenido-canvas" style={{ textAlign: 'center', marginTop: '100px' }}>
          <Title level={2} style={{ color: 'var(--alo-blanco)' }}>Acceso Restringido</Title>
          <p style={{ color: 'var(--alo-gris-claro)' }}>Debes iniciar sesión con la cuenta de administrador.</p>
          <Link to="/"><Button type="primary" className="btn-azul">Volver al Inicio</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="cuerpo-page-container"
    >
      <div className="tiendapage-contenido">
        <div className="tiendapage-contenido-canvas">
          
          <Breadcrumb 
            style={{ marginTop: '20px' }}
            items={[
              { title: <Link to="/" style={{ color: 'var(--alo-gris-claro)' }}>Inicio</Link> },
              { title: <span style={{ color: 'var(--alo-blanco)' }}>Administración</span> },
            ]}
          />

          <div className="admin-header-row">
            <h1 className="titulo-productos">Panel de Control</h1>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => navigate('/admin/producto/nuevo')}
              className="btn-azul"
            >
              Nuevo Producto
            </Button>
          </div>

          <Row gutter={[16, 16]} style={{ marginBottom: '30px' }}>
            <Col xs={24} sm={8}>
              <Card className="admin-stat-card">
                <Statistic 
                  title={<span style={{ color: 'var(--alo-gris-claro)' }}>Productos</span>} 
                  value={products.length} 
                  prefix={<ShoppingOutlined />} 
                  valueStyle={{ color: 'var(--alo-blanco)' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card className="admin-stat-card">
                <Statistic 
                  title={<span style={{ color: 'var(--alo-gris-claro)' }}>Públicos</span>} 
                  value={products.filter(p => p.disponible).length} 
                  valueStyle={{ color: '#52c41a' }} 
                />
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card className="admin-stat-card">
                <Statistic 
                  title={<span style={{ color: 'var(--alo-gris-claro)' }}>Gratuitos</span>} 
                  value={products.filter(p => p.liberado).length} 
                  valueStyle={{ color: '#faad14' }} 
                />
              </Card>
            </Col>
          </Row>

          <div className="admin-table-wrapper">
            <Table 
              columns={columns} 
              dataSource={products} 
              loading={loading} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
              className="custom-admin-table"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
