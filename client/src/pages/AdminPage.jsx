import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, Button, Form, Input, InputNumber, 
  Select, Switch, Space, Tag, Typography, message, 
  Card, Statistic, Row, Col, Tooltip, Popconfirm, Spin 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  ShoppingOutlined, CheckCircleOutlined, 
  GlobalOutlined, YoutubeOutlined, FileExcelOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getProducts } from '../lib/api';
import { auth } from '../lib/firebase';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './AdminPage.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
          <Text strong style={{ fontSize: '15px' }}>{record.nombre}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.id}</Text>
        </Space>
      ),
    },
    {
      title: 'Categoría',
      key: 'category',
      render: (_, record) => {
        const cat = tiendaCategorias.find(c => String(c.id) === String(record.id_categoria));
        return <Tag color="blue">{cat?.nombre || 'S/N'}</Tag>;
      }
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (p) => <Text strong>${p.toLocaleString()}</Text>
    },
    {
      title: 'Estados',
      key: 'status',
      render: (_, record) => (
        <Space size="small">
          {record.disponible ? <Tag icon={<CheckCircleOutlined />} color="success">Stock</Tag> : <Tag color="default">Pausado</Tag>}
          {record.liberado && <Tag icon={<GlobalOutlined />} color="gold">Gratis</Tag>}
        </Space>
      )
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => navigate(`/admin/producto/editar/${record.id}`)} />
          </Tooltip>
          <Popconfirm title="¿Eliminar producto?" onConfirm={() => handleDelete(record.id)} okText="Sí" cancelText="No">
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (user === undefined) return <div className="admin-loading-container"><Spin size="large" tip="Verificando permisos..." /></div>;
  if (!user || user.email !== 'aloasesoriasexcel@gmail.com') {
    return (
      <div className="admin-no-access">
        <Card variant="borderless" className="glass-card">
          <Title level={2}>Acceso Restringido</Title>
          <Text type="secondary">Inicia sesión con la cuenta de administrador para gestionar la tienda.</Text>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="admin-dashboard"
    >
      <div className="dashboard-header">
        <div className="header-text">
          <Title level={2}>Gestión de Catálogo</Title>
          <Text type="secondary">Administra los productos, precios y disponibilidad de la tienda.</Text>
        </div>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlusOutlined />} 
          onClick={() => navigate('/admin/producto/nuevo')}
          className="btn-gradient"
        >
          Nuevo Producto
        </Button>
      </div>

      <Row gutter={[16, 16]} className="stats-row">
        <Col span={8}>
          <Card className="stat-card" variant="borderless">
            <Statistic title="Total Productos" value={products.length} prefix={<ShoppingOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card" variant="borderless">
            <Statistic title="Disponibles" value={products.filter(p => p.disponible).length} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card" variant="borderless">
            <Statistic title="Gratuitos" value={products.filter(p => p.liberado).length} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      <Card className="table-card" variant="borderless">
        <Table 
          columns={columns} 
          dataSource={products} 
          loading={loading} 
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Card>


    </motion.div>
  );
};

export default AdminPage;
