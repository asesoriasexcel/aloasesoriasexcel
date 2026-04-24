import React from 'react';
import { Table, Button } from 'antd';
import { EyeOutlined, StarFilled } from '@ant-design/icons';

const orderData = [
  { key: '1', date: '28/04/2023', orderId: '#4046', product: 'Planificación Pro', rating: 4.5, amount: 333.9, status: 'Paid' },
  { key: '2', date: '13/05/2023', orderId: '#8780', product: 'Control de Inventario', rating: 5, amount: 745.9, status: 'Refund' },
  { key: '3', date: '17/03/2023', orderId: '#7513', product: 'Dashboard Financiero', rating: 4.8, amount: 825.9, status: 'Paid' },
  { key: '4', date: '08/09/2023', orderId: '#7579', product: 'Gestión de Proyectos', rating: 4.2, amount: 287.7, status: 'Paid' },
  { key: '5', date: '23/04/2023', orderId: '#3111', product: 'Presupuesto Familiar', rating: 3.9, amount: 496.8, status: 'Cancel' },
  { key: '6', date: '17/11/2022', orderId: '#8647', point: 'Seguimiento Ventas', product: 'Seguimiento Ventas', rating: 4.8, amount: 846.2, status: 'Cancel' },
  { key: '7', date: '17/02/2023', orderId: '#4375', product: 'Cotizador Dinámico', rating: 5.0, amount: 797.3, status: 'Paid' },
  { key: '8', date: '01/07/2023', orderId: '#3924', product: 'Control de Horas', rating: 4.5, amount: 409.0, status: 'Paid' },
];

const columns = [
  { 
    title: 'Date', 
    dataIndex: 'date', 
    key: 'date', 
    render: text => <span style={{ color: 'var(--alo-gris)' }}>{text}</span> 
  },
  { 
    title: 'OrderID', 
    dataIndex: 'orderId', 
    key: 'orderId', 
    render: text => <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>{text}</span> 
  },
  { 
    title: 'Product', 
    key: 'product', 
    render: (_, record) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>{record.product}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--alo-gris)' }}>
          <StarFilled style={{ color: 'var(--alo-verde)', fontSize: '10px' }} />
          <span>{record.rating}</span>
        </div>
      </div>
    )
  },
  { 
    title: 'Amount', 
    dataIndex: 'amount', 
    key: 'amount', 
    render: amount => <span style={{ color: 'var(--alo-blanco)', fontWeight: 600 }}>$ {amount.toFixed(1)}</span> 
  },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status', 
    render: status => {
      let color = 'var(--alo-verde-claro)';
      let bg = 'rgba(61, 184, 102, 0.15)';
      let border = 'rgba(61, 184, 102, 0.3)';
      
      if (status === 'Refund') {
        color = '#eab308';
        bg = 'rgba(234, 179, 8, 0.15)';
        border = 'rgba(234, 179, 8, 0.3)';
      }
      if (status === 'Cancel') {
        color = '#ef4444';
        bg = 'rgba(239, 68, 68, 0.15)';
        border = 'rgba(239, 68, 68, 0.3)';
      }
      
      return (
        <span style={{ 
          color, 
          background: bg, 
          border: `1px solid ${border}`,
          padding: '2px 8px', 
          borderRadius: '100px', 
          fontSize: '11px', 
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {status}
        </span>
      );
    } 
  },
  { 
    title: 'Action', 
    key: 'action', 
    render: () => (
      <Button 
        type="text" 
        icon={<EyeOutlined />} 
        style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          color: 'var(--alo-blanco)',
          border: '1px solid var(--alo-borde)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px'
        }}
      >
        View
      </Button>
    ) 
  },
];

const MisComprasPage = () => {
  return (
    <div style={{ maxWidth: '1100px', width: '100%', padding: '24px' }}>
      
      <div style={{ 
        background: 'var(--alo-oscuro2)', 
        borderRadius: '8px', 
        border: '1px solid var(--alo-borde)', 
        padding: '24px',
        overflow: 'hidden'
      }}>
        <h1 style={{ fontSize: '20px', color: 'var(--alo-blanco)', margin: '0 0 24px', fontWeight: 600 }}>
          Order List
        </h1>
        
        {/* Table container for responsive scroll */}
        <div style={{ overflowX: 'auto' }}>
          <Table 
            columns={columns} 
            dataSource={orderData} 
            pagination={false} 
            size="middle"
            className="mis-compras-table"
            style={{ minWidth: '800px' }}
          />
        </div>
      </div>

    </div>
  );
};

export default MisComprasPage;
