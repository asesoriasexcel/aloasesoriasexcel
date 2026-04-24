import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form, Input, InputNumber, Select, Switch, Button,
  Row, Col, message, Spin,
} from 'antd';
import {
  ArrowLeftOutlined, SaveOutlined,
  YoutubeOutlined, FileExcelOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { auth } from '../lib/firebase';
import { getProducts } from '../lib/api';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import AdminPageHeader from '../layouts/admin/AdminPageHeader';
import '../layouts/admin/AdminComponents.css';

const { TextArea } = Input;
const { Option } = Select;

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        tipo: 'Excel',
      });
    }
  }, [id]);

  const loadProduct = async () => {
    setFetching(true);
    try {
      const products = await getProducts();
      const product = products.find((p) => p.id === id);
      if (product) {
        form.setFieldsValue(product);
      } else {
        message.error('Producto no encontrado');
        navigate('/admin');
      }
    } catch {
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
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        message.success(id ? 'Producto actualizado' : '¡Producto creado!');
        window.dispatchEvent(new Event('adminProductsChanged'));
        setTimeout(() => navigate('/admin'), 1200);
      } else {
        const err = await res.json();
        message.error(`Error: ${err.error ?? 'Error desconocido'}`);
      }
    } catch (error) {
      message.error(`Error al guardar: ${error.message}`);
    } finally {
      setLoading(false);
      hide();
    }
  };

  if (fetching) {
    return (
      <div className="admin-loading-state">
        <Spin size="large" />
        <span>Cargando producto...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ width: '100%', maxWidth: '800px' }}
      >
        {/* Cabecera de página */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--admin-text-primary)' }}>
              {id ? 'Editar producto' : 'Nuevo producto'}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--admin-text-subtle)' }}>
              {id ? `Modificando: ${id}` : 'Completa los campos para agregar un nuevo producto al catálogo.'}
            </p>
          </div>
          {/* Breadcrumbs or actions */}
          <div style={{ fontSize: '13px', color: 'var(--admin-text-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href="/admin" style={{ color: 'var(--admin-text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--admin-text-primary)'} onMouseOut={e => e.target.style.color = 'var(--admin-text-subtle)'}>Catálogo</a>
            <span>{'>'}</span>
            <span style={{ color: 'var(--admin-text-primary)', fontWeight: 500 }}>{id ? 'Editar' : 'Nuevo'}</span>
          </div>
        </div>

        {/* Formulario */}
        <div className="admin-form-surface" style={{ padding: '32px' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>

            {/* ── Información básica ───────────────────────────── */}
            <p className="admin-form-section-title">Información básica</p>

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="id" label="ID del producto (slug)" rules={[{ required: true }]}>
                  <Input disabled={!!id} placeholder="ej: planilla-control-gastos-pro" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="nombre" label="Nombre comercial" rules={[{ required: true }]}>
                  <Input placeholder="Nombre que verá el cliente" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={8}>
                <Form.Item name="precio" label="Precio ($)" rules={[{ required: true }]}>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    formatter={(v) => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(v) => v.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="grado" label="Nivel / Grado">
                  <Select>
                    <Option value="Básico">Básico</Option>
                    <Option value="Full">Full</Option>
                    <Option value="Pro">Pro</Option>
                    <Option value="Master">Master</Option>
                    <Option value="Legendario">Legendario</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="tipo" label="Tipo de producto">
                  <Select>
                    <Option value="Excel">Planilla Excel (.xlsm)</Option>
                    <Option value="Ejecutable">Software Ejecutable (.exe)</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="id_categoria" label="Categoría principal" rules={[{ required: true }]}>
                  <Select placeholder="Selecciona una categoría">
                    {tiendaCategorias.map((c) => (
                      <Option key={c.id} value={String(c.id)}>{c.nombre}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="id_subcategoria" label="Subcategoría">
                  <Select placeholder="Opcional" allowClear>
                    {tiendaSubcategorias.map((s) => (
                      <Option key={s.id} value={String(s.id)}>{s.nombre}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="descripcion" label="Resumen corto (tarjeta de tienda)">
              <TextArea rows={2} placeholder="Descripción breve que aparece en el listado" />
            </Form.Item>

            <Form.Item name="descripcion_larga" label="Descripción detallada (página de producto)">
              <TextArea rows={5} placeholder="Descripción completa visible en la página del producto" />
            </Form.Item>

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="funcionalidades" label="Funcionalidades principales">
                  <TextArea rows={3} placeholder="Lista las funciones clave del producto" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="requisitos" label="Requisitos técnicos">
                  <TextArea rows={3} placeholder="Versión de Excel, SO, etc." />
                </Form.Item>
              </Col>
            </Row>

            {/* ── Archivos y media ─────────────────────────────── */}
            <p className="admin-form-section-title">Archivos y media</p>

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="driveFileName"
                  label="Archivo en Google Drive"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={<FileExcelOutlined />}
                    placeholder="planilla-control-gastos.xlsm"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="video_link" label="URL demo YouTube">
                  <Input
                    prefix={<YoutubeOutlined />}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="imagen" label="URL imagen de portada">
              <Input placeholder="https://... (imagen pública accesible por URL)" />
            </Form.Item>

            {/* ── Visibilidad ──────────────────────────────────── */}
            <p className="admin-form-section-title">Visibilidad</p>

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="disponible"
                  label="Mostrar en tienda (público)"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="liberado"
                  label="Producto gratuito"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            {/* ── Footer ───────────────────────────────────────── */}
            <div className="admin-form-footer">
              <Button onClick={() => navigate('/admin')}>Cancelar</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="btn-verde"
                style={{ borderRadius: '6px', fontWeight: 500 }}
              >
                {id ? 'Guardar cambios' : 'Crear producto'}
              </Button>
            </div>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProductForm;
