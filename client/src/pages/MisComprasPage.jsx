import React, { useEffect, useState } from 'react';
import { Table, App, Spin, Breadcrumb, Modal, Button, Space, Descriptions, Tag } from 'antd';
import { InfoCircleOutlined, KeyOutlined, DownloadOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import './MisComprasPage.css';

const getStatusTag = (status) => {
  let color = 'var(--alo-verde-claro)';
  let bg = 'rgba(61, 184, 102, 0.15)';
  let border = 'rgba(61, 184, 102, 0.3)';
  let text = 'Aprobado';
  if (status === 'pending' || status === 'in_process') {
    color = '#eab308'; bg = 'rgba(234, 179, 8, 0.15)'; border = 'rgba(234, 179, 8, 0.3)'; text = 'Pendiente';
  } else if (status === 'rejected' || status === 'cancelled') {
    color = '#ef4444'; bg = 'rgba(239, 68, 68, 0.15)'; border = 'rgba(239, 68, 68, 0.3)'; text = 'Rechazado';
  }
  return (
    <span style={{ color, background: bg, border: `1px solid ${border}`, padding: '2px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
      {text}
    </span>
  );
};

// Las columnas se definen dentro del componente para acceder a los estados de los modales


const MisComprasPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { message } = App.useApp();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para modales
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('status') === 'success') {
      localStorage.removeItem('ae-carrito');
      window.dispatchEvent(new Event('cartUpdated'));
      message.success('¡Pago exitoso! Tu compra se ha procesado.');
    } else if (params.get('status') === 'pending') {
      localStorage.removeItem('ae-carrito');
      window.dispatchEvent(new Event('cartUpdated'));
      message.info('Tu pago está pendiente. Te notificaremos cuando se apruebe.');
    }
  }, [location.search]);

  useEffect(() => {
    if (user === null) { setLoading(false); return; }
    if (user) fetchPurchases();
  }, [user]);

  const fetchPurchases = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch('/api/purchases', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const formatted = data.purchases.map(p => ({
          key: p.id,
          date: new Date(p.date).toLocaleDateString('es-CL'),
          orderId: `#${String(p.paymentId || p.id).substring(0, 8)}`,
          product: Array.isArray(p.items) ? p.items.map(i => i.title).join(', ') : 'Producto Aló Excel',
          amount: p.total,
          status: p.status,
          raw: p // Guardamos todo el objeto para el detalle
        }));
        setPurchases(formatted);
      }
    } catch {
      message.error('Error al cargar el historial de compras');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (record) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const items = record.raw.items || [];
      for (const item of items) {
        const res = await fetch(`/api/download?productId=${item.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          const err = await res.json();
          message.error(err.error || 'Error al obtener el enlace de descarga');
          return;
        }
        const { url } = await res.json();
        window.open(url, '_blank');
      }
    } catch {
      message.error('Error al procesar la descarga');
    }
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      width: 110,
      responsive: ['lg'], // Solo en pantallas grandes
      render: text => <span style={{ color: 'var(--alo-gris)', fontSize: '13px' }}>{text}</span>
    },
    {
      title: 'Orden',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      responsive: ['md'], // Tablets y escritorio
      render: text => <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>{text}</span>
    },
    {
      title: 'Productos',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>{text}</span>
          <div className="mobile-only-info" style={{ fontSize: '11px', color: 'var(--alo-gris)' }}>
            {record.date} • {record.orderId}
          </div>
        </div>
      )
    },
    {
      title: 'Total',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      responsive: ['md'], // Tablets y escritorio
      render: amount => (
        <span style={{ color: 'var(--alo-verde-claro)', fontWeight: 600 }}>
          {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)}
        </span>
      )
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      align: 'center',
      responsive: ['md'], // Solo desde tablets/escritorio
      render: status => getStatusTag(status)
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 120,
      align: 'right',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <InfoCircleOutlined 
            onClick={() => { setSelectedPurchase(record); setIsDetailModalOpen(true); }}
            style={{ color: 'var(--alo-gris-claro)', fontSize: '18px', cursor: 'pointer' }}
            title="Detalle de compra"
          />
          <KeyOutlined 
            onClick={() => { setSelectedPurchase(record); setIsLicenseModalOpen(true); }}
            style={{ color: 'var(--alo-amarillo)', fontSize: '18px', cursor: 'pointer' }}
            title="Ver Licencias"
          />
          <DownloadOutlined
            onClick={record.status === 'approved' ? () => handleDownload(record) : undefined}
            style={{
              color: record.status === 'approved' ? 'var(--alo-verde-claro)' : 'var(--alo-gris)',
              fontSize: '18px',
              cursor: record.status === 'approved' ? 'pointer' : 'not-allowed',
              opacity: record.status === 'approved' ? 1 : 0.4
            }}
            title={record.status === 'approved' ? 'Descargar archivos' : 'Solo disponible para compras aprobadas'}
          />
        </div>
      )
    }
  ];


  return (
    <div className="mis-compras-wrapper">

      {/* Cabecera superior idéntica a TiendaPage */}
      <div className="tienda-header-container" style={{ marginBottom: '8px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="tienda-title-main">
          Mis Compras
          {purchases.length > 0 && (
            <span className="tienda-title-count">
              ({purchases.length})
            </span>
          )}
        </h1>
        <Breadcrumb
          className="tienda-breadcrumb"
          separator={<span style={{ color: 'var(--alo-gris)', opacity: 0.5 }}>/</span>}
          items={[
            { title: <Link to="/tienda" style={{ color: 'var(--alo-gris-claro)', textDecoration: 'none' }}>Catálogo</Link> },
            { title: <span style={{ color: 'var(--alo-verde-claro)' }}>Historial</span> }
          ]}
        />
      </div>

      {/* Card único de contenido */}
      <div className="mis-compras-card">
        {!user ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--alo-gris)' }}>
            <p style={{ margin: 0, fontSize: '15px' }}>Debes iniciar sesión para ver tus compras.</p>
          </div>
        ) : loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <div className="mis-compras-table-container">
            <Table
              columns={columns}
              dataSource={purchases}
              pagination={false}
              size="middle"
              className="mis-compras-table"
              locale={{ emptyText: 'No tienes compras registradas aún.' }}
            />
          </div>
        )}
      </div>

      {/* Modal Detalle de Compra */}
      <Modal
        title="Detalle de la Compra"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalOpen(false)}>
            Cerrar
          </Button>
        ]}
        width={600}
      >
        {selectedPurchase && (
          <Descriptions column={1} bordered size="small" className="purchase-details-desc">
            <Descriptions.Item label="ID Orden">{selectedPurchase.orderId}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{selectedPurchase.date}</Descriptions.Item>
            <Descriptions.Item label="Estado">{getStatusTag(selectedPurchase.status)}</Descriptions.Item>
            <Descriptions.Item label="Productos">{selectedPurchase.product}</Descriptions.Item>
            <Descriptions.Item label="Total">
              <span style={{ color: 'var(--alo-verde-claro)', fontWeight: 600 }}>
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(selectedPurchase.amount)}
              </span>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal Licencias */}
      <Modal
        title={
          <Space>
            <KeyOutlined style={{ color: 'var(--alo-amarillo)' }} />
            <span>Licencias de Uso</span>
          </Space>
        }
        open={isLicenseModalOpen}
        onCancel={() => setIsLicenseModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsLicenseModalOpen(false)}>
            Entendido
          </Button>
        ]}
        width={500}
      >
        {selectedPurchase && (
          <div className="license-modal-content">
            <p style={{ color: 'var(--alo-gris)', fontSize: '13px' }}>
              Esta es tu clave única de activación para los productos adquiridos. Por favor, mantenla en un lugar seguro.
            </p>
            
            <div className="license-key-container">
              <div className="license-key-header">
                <span className="license-key-label">LICENCIA ÚNICA</span>
                <Tag color="gold">ACTIVA</Tag>
              </div>
              <code className="license-key-code">
                {String(selectedPurchase.raw.id).toUpperCase()}-XXXX-AL0EXCEL-{new Date().getFullYear()}
              </code>
              <p className="license-key-footer">
                Válida para: {selectedPurchase.product}
              </p>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--alo-amarillo)', lineHeight: 1.5 }}>
                <strong>Nota Importante:</strong> Esta licencia es de uso exclusivo personal y privado. Compartir esta clave puede resultar en la suspensión permanente del acceso a las actualizaciones.
              </p>
            </div>
          </div>
        )}
      </Modal>


    </div>
  );
};

export default MisComprasPage;
