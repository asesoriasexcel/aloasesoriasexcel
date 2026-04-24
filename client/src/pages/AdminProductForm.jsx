import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Form, Input, InputNumber, Select, Switch, Button, 
  Space, Row, Col, Typography, message, Breadcrumb, Spin, Card 
} from 'antd';
import { 
  ArrowLeftOutlined, SaveOutlined, 
  YoutubeOutlined, FileExcelOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { getProducts } from '../lib/api';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './AdminStyles.css';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    } else {
      form.setFieldsValue({
        disponible: true,
        liberado: false,
        grado: 'Básico',
        precio: 0,
        video_si: 'no',
        tipo: 'Excel'
      });
    }
  }, [id]);

  const loadProduct = async () => {
    setFetching(true);
    try {
      const products = await getProducts();
      const product = products.find(p => p.id === id);
      if (product) {
        form.setFieldsValue(product);
      } else {
        message.error('Producto no encontrado');
        navigate('/admin');
      }
    } catch (error) {
      message.error('Error al cargar datos del producto');
    } finally {
      setFetching(false);
    }
  };

  const onFinish = async (values) => {
    if (!auth.currentUser) {
      message.error('Debes estar autenticado para guardar cambios.');
      return;
    }

    setLoading(true);
    const hide = message.loading('Sincronizando con base de datos...', 0);
    
    try {
      const token = await auth.currentUser.getIdToken();
      console.log('Enviando datos a la API...');
      
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(values)
      });

      if (res.ok) {
        message.success(id ? 'Producto actualizado correctamente' : '¡Producto creado con éxito!');
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        const err = await res.json();
        message.error(`Error del Servidor: ${err.error || 'Error desconocido'}`);
        console.error('Error de API:', err);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      message.error(`Fallo en el envío: ${error.message}`);
    } finally {
      setLoading(false);
      hide();
    }
  };

  if (user === undefined || fetching) {
    return (
      <div className="cuerpo-page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large">
          <div style={{ marginTop: '40px', color: 'var(--alo-gris-claro)' }}>Cargando datos del producto...</div>
        </Spin>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="cuerpo-page-container"
    >
      <div className="tiendapage-contenido">
        <div className="tiendapage-contenido-canvas">
          
          <Breadcrumb 
            style={{ marginTop: '20px' }}
            items={[
              { title: <Link to="/" style={{ color: 'var(--alo-gris-claro)' }}>Inicio</Link> },
              { title: <Link to="/admin" style={{ color: 'var(--alo-gris-claro)' }}>Administración</Link> },
              { title: <span style={{ color: 'var(--alo-blanco)' }}>{id ? 'Editar Producto' : 'Nuevo Producto'}</span> },
            ]}
          />

          <div className="admin-header-row" style={{ marginBottom: '40px' }}>
            <h1 className="titulo-productos">{id ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h1>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/admin')}
              className="btn-azulsecundario"
            >
              Volver
            </Button>
          </div>

          <Card className="admin-form-card">
            <Form 
              form={form} 
              layout="vertical" 
              onFinish={onFinish}
            >
              <Title level={4} style={{ color: 'var(--alo-verde)', marginBottom: '24px' }}>Información Básica</Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="id" label="ID del Producto (Slug)" rules={[{ required: true }]}>
                    <Input disabled={!!id} placeholder="ej: mi-archivo-pro-01" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="nombre" label="Nombre Comercial" rules={[{ required: true }]}>
                    <Input placeholder="Nombre que verá el cliente..." />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="precio" label="Precio de venta ($)" rules={[{ required: true }]}>
                    <InputNumber 
                      style={{ width: '100%' }} 
                      min={0} 
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="grado" label="Nivel/Grado">
                    <Select>
                      <Option value="Básico">Básico</Option>
                      <Option value="Full">Full</Option>
                      <Option value="Pro">Pro</Option>
                      <Option value="Master">Master</Option>
                      <Option value="Legendario">Legendario</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="id_categoria" label="Categoría Principal" rules={[{ required: true }]}>
                    <Select placeholder="Selecciona...">
                      {tiendaCategorias.map(c => <Option key={c.id} value={String(c.id)}>{c.nombre}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="id_subcategoria" label="Subcategoría">
                    <Select placeholder="Selecciona (opcional)..." allowClear>
                      {tiendaSubcategorias.map(s => <Option key={s.id} value={String(s.id)}>{s.nombre}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="descripcion" label="Resumen Corto (Tarjeta)">
                <TextArea rows={2} placeholder="Descripción que aparece en el listado..." />
              </Form.Item>

              <Form.Item name="descripcion_larga" label="Descripción Detallada">
                <TextArea rows={5} placeholder="Todo el detalle que verá el usuario en la página del producto..." />
              </Form.Item>

              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item name="tipo" label="Tipo de Producto">
                    <Select placeholder="Selecciona el formato...">
                      <Option value="Excel">Planilla Excel (.xlsm)</Option>
                      <Option value="Ejecutable">Software Ejecutable (.exe)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="funcionalidades" label="Funcionalidades Principales">
                <TextArea rows={3} placeholder="Enlista las funciones principales del producto..." />
              </Form.Item>

              <Form.Item name="requisitos" label="Requisitos Técnicos">
                <TextArea rows={2} placeholder="Versión de Excel, Sistema Operativo, etc..." />
              </Form.Item>

              <Title level={4} style={{ color: 'var(--alo-verde)', marginTop: '32px', marginBottom: '24px' }}>Archivos y Media</Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="driveFileName" label="Nombre del archivo en Google Drive" rules={[{ required: true }]}>
                    <Input prefix={<FileExcelOutlined />} placeholder="archivo.xlsm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="video_link" label="URL Demo Youtube">
                    <Input prefix={<YoutubeOutlined />} placeholder="https://youtube.com/watch?v=..." />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="imagen" label="URL Imagen del Producto">
                <Input placeholder="URL de la imagen de portada o previsualización..." />
              </Form.Item>

              <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={12}>
                  <Form.Item name="disponible" label="Mostrar en Tienda (Público)" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="liberado" label="Es Producto Gratuito" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(26, 138, 74, 0.2)', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                <Button size="large" onClick={() => navigate('/admin')}>Cancelar</Button>
                <Button type="primary" size="large" htmlType="submit" loading={loading} className="btn-naranjo" icon={<SaveOutlined />}>
                  {id ? 'Guardar Cambios' : 'Crear Producto'}
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProductForm;
