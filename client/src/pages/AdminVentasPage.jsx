import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin, Breadcrumb, Descriptions, Modal, Button, Space, Statistic, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { DollarOutlined, ShoppingOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { auth } from '../lib/firebase';

const getStatusTag = (status) => {
  if (status === 'approved') return <Tag color="success">Aprobado</Tag>;
  if (status === 'pending' || status === 'in_process') return <Tag color="warning">Pendiente</Tag>;
  return <Tag color="error">Rechazado</Tag>;
};

const fmt = (n) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n ?? 0);

const AdminVentasPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch('/api/admin/purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPurchases(data.purchases);
        }
      } catch {
        // silently fail — admin page guard handles auth
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const approved = purchases.filter(p => p.status === 'approved');
  const totalRevenue = approved.reduce((acc, p) => acc + (p.total ?? 0), 0);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: v => <span style={{ color: 'var(--alo-gris)', fontSize: 13 }}>{new Date(v).toLocaleDateString('es-CL')}</span>
    },
    {
      title: 'Orden',
      key: 'orderId',
      width: 120,
      render: (_, r) => <span style={{ color: 'var(--alo-blanco)', fontWeight: 500, fontFamily: 'monospace', fontSize: 12 }}>#{String(r.paymentId || r.id).substring(0, 10)}</span>
    },
    {
      title: 'Cliente',
      dataIndex: 'userEmail',
      key: 'userEmail',
      render: v => <span style={{ color: 'var(--alo-gris-claro)', fontSize: 13 }}>{v}</span>
    },
    {
      title: 'Productos',
      key: 'items',
      render: (_, r) => (
        <span style={{ color: 'var(--alo-blanco)', fontSize: 13 }}>
          {Array.isArray(r.items) ? r.items.map(i => i.title).join(', ') : '—'}
        </span>
      )
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      align: 'right',
      render: v => <span style={{ color: 'var(--alo-verde-claro)', fontWeight: 600 }}>{fmt(v)}</span>
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      align: 'center',
      render: getStatusTag
    },
    {
      title: '',
      key: 'detail',
      width: 60,
      align: 'center',
      render: (_, r) => (
        <Button size="small" ghost onClick={() => setSelected(r)}
          style={{ color: 'var(--alo-gris-claro)', borderColor: 'rgba(255,255,255,0.12)', fontSize: 11 }}>
          Ver
        </Button>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'var(--admin-text-primary)' }}>
          Ventas
        </h1>
        <Breadcrumb
          separator={<span style={{ color: 'var(--admin-text-subtle)', opacity: 0.5 }}>/</span>}
          items={[
            { title: <Link to="/admin" style={{ color: 'var(--admin-text-subtle)', textDecoration: 'none' }}>Admin</Link> },
            { title: <span style={{ color: 'var(--admin-text-primary)' }}>Ventas</span> }
          ]}
        />
      </div>

      {/* Stats */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={12} md={6}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Ingresos aprobados</div>
            <div className="admin-stat-value admin-stat-value--accent">{fmt(totalRevenue)}</div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total ventas</div>
            <div className="admin-stat-value">{purchases.length}</div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Aprobadas</div>
            <div className="admin-stat-value admin-stat-value--accent">{approved.length}</div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Pendientes</div>
            <div className="admin-stat-value admin-stat-value--gold">
              {purchases.filter(p => p.status === 'pending' || p.status === 'in_process').length}
            </div>
          </div>
        </Col>
      </Row>

      <div className="admin-content-panel admin-content-panel--padded">
        {loading ? (
          <div className="admin-loading-state"><Spin size="large" /></div>
        ) : (
          <Table
            columns={columns}
            dataSource={purchases.map(p => ({ ...p, key: p.id }))}
            pagination={{ pageSize: 20, showSizeChanger: false }}
            size="middle"
            className="mis-compras-table"
            locale={{ emptyText: 'Sin ventas registradas.' }}
            scroll={{ x: 700 }}
          />
        )}
      </div>

      <Modal
        title="Detalle de la venta"
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={<Button onClick={() => setSelected(null)}>Cerrar</Button>}
        width={560}
      >
        {selected && (
          <Descriptions column={1} bordered size="small" className="purchase-details-desc">
            <Descriptions.Item label="ID">{selected.id}</Descriptions.Item>
            <Descriptions.Item label="Payment ID">{selected.paymentId ?? '—'}</Descriptions.Item>
            <Descriptions.Item label="Cliente">{selected.userEmail}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{new Date(selected.date).toLocaleString('es-CL')}</Descriptions.Item>
            <Descriptions.Item label="Estado">{getStatusTag(selected.status)}</Descriptions.Item>
            <Descriptions.Item label="Productos">
              {Array.isArray(selected.items)
                ? selected.items.map(i => `${i.title} (x${i.quantity ?? 1})`).join(', ')
                : '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Total">
              <span style={{ color: 'var(--alo-verde-claro)', fontWeight: 600 }}>{fmt(selected.total)}</span>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default AdminVentasPage;
