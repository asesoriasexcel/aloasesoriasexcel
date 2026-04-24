import React from 'react';
import { Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const transactionData = [
  { key: '1', name: 'Rasia', type: 'Plantilla', date: '14/05/2023', status: 'Pagado', amount: 3321 },
  { key: '2', name: 'Trip', type: 'Suscripción', date: '24/02/2023', status: 'Reembolso', amount: 1687 },
  { key: '3', name: 'Tiphanie', type: 'Desarrollo', date: '06/09/2023', status: 'Pagado', amount: 5691 },
  { key: '4', name: 'Moreen', type: 'Plantilla', date: '09/11/2022', status: 'Pagado', amount: 3745 },
  { key: '5', name: 'Lorinda', type: 'Suscripción', date: '10/08/2023', status: 'Cancelado', amount: 4844 },
  { key: '6', name: 'Nella', type: 'Desarrollo', date: '07/04/2023', status: 'Cancelado', amount: 3524 },
  { key: '7', name: 'Tirrell', type: 'Plantilla', date: '10/12/2022', status: 'Pagado', amount: 5019 },
  { key: '8', name: 'Dunc', type: 'Suscripción', date: '18/08/2023', status: 'Pagado', amount: 8574 },
  { key: '9', name: 'Obie', type: 'Plantilla', date: '21/10/2023', status: 'Pagado', amount: 8276 },
  { key: '10', name: 'Kl', type: 'Desarrollo', date: '18/06/2023', status: 'Reembolso', amount: 4140 },
];

const columns = [
  { 
    title: 'Nombre', 
    dataIndex: 'name', 
    key: 'name', 
    render: text => <span style={{ color: 'var(--alo-blanco)' }}>{text}</span> 
  },
  { 
    title: 'Tipo', 
    dataIndex: 'type', 
    key: 'type', 
    render: text => <span style={{ color: 'var(--alo-gris)' }}>{text}</span> 
  },
  { 
    title: 'Fecha', 
    dataIndex: 'date', 
    key: 'date', 
    render: text => <span style={{ color: 'var(--alo-gris)' }}>{text}</span> 
  },
  { 
    title: 'Estado', 
    dataIndex: 'status', 
    key: 'status', 
    render: status => {
      let color = 'var(--alo-verde-claro)';
      if (status === 'Reembolso') color = '#eab308'; // Amarillo
      if (status === 'Cancelado') color = '#ef4444'; // Rojo
      return <span style={{ color, fontWeight: 500 }}>{status}</span>;
    } 
  },
  { 
    title: 'Monto', 
    dataIndex: 'amount', 
    key: 'amount', 
    render: amount => <span style={{ color: 'var(--alo-blanco)' }}>${amount}</span> 
  },
];

const AdminWalletPage = () => {
  return (
    <div style={{ maxWidth: '1100px', display: 'flex', gap: '24px', width: '100%', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      
      {/* Columna Izquierda: Historial */}
      <div style={{ 
        flex: 1, 
        minWidth: '320px', 
        background: 'var(--alo-oscuro2)', 
        borderRadius: '12px', 
        border: '1px solid var(--alo-borde)', 
        padding: '24px',
        overflow: 'hidden'
      }}>
        <h2 style={{ fontSize: '18px', color: 'var(--alo-blanco)', margin: '0 0 24px', fontWeight: 600 }}>
          Historial de Transacciones
        </h2>
        {/* Usamos el componente Table de antd nativo, porque ya está estilizado para AdminComponents */}
        <Table 
          columns={columns} 
          dataSource={transactionData} 
          pagination={{ pageSize: 10, position: ['bottomRight'] }} 
          size="middle"
        />
      </div>

      {/* Columna Derecha: Balance & Resumen */}
      <div style={{ 
        width: '340px', 
        flexShrink: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px' 
      }}>
        
        {/* Your Balance Container */}
        <div style={{
          background: 'var(--alo-oscuro2)', 
          borderRadius: '12px', 
          border: '1px solid var(--alo-borde)', 
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '16px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 600 }}>
            Tu Saldo
          </h2>
          
          {/* Virtual Card */}
          <div style={{
            background: 'linear-gradient(135deg, var(--alo-verde), #083b1a)', 
            borderRadius: '12px',
            padding: '20px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            height: '160px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}>
             {/* Círculos decorativos */}
             <div style={{ position: 'absolute', right: '-20px', top: '20px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
             <div style={{ position: 'absolute', left: '-50px', bottom: '-50px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
             
             {/* Top info */}
             <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.8, letterSpacing: '0.5px' }}>Saldo Actual</p>
                  <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 700, letterSpacing: '1px' }}>$ 78.984</p>
                </div>
                {/* Logo CSS mock */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', opacity: 0.9, position: 'relative', right: '-10px', zIndex: 2 }} />
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', opacity: 0.9, zIndex: 1 }} />
                </div>
             </div>

             {/* Bottom info (Datos ofuscados) */}
             <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <p style={{ margin: 0, fontSize: '16px', letterSpacing: '3px', fontWeight: 500 }}>**** **** **** ****</p>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.8 }}>**/**</p>
             </div>
          </div>
        </div>

        {/* Earning Amount */}
        <div style={{
          background: 'var(--alo-oscuro2)', 
          borderRadius: '12px', 
          border: '1px solid var(--alo-borde)', 
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '14px', color: 'var(--alo-gris)', margin: '0 0 16px', fontWeight: 500 }}>Ingresos</h3>
          <p style={{ fontSize: '28px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 700 }}>$54.654</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <div style={{ 
               width: '32px', height: '32px', borderRadius: '50%', 
               background: 'rgba(56, 189, 248, 0.1)', display: 'flex', 
               alignItems: 'center', justifyContent: 'center', color: '#38bdf8' 
             }}>
               <ArrowUpOutlined style={{ fontSize: '14px' }} />
             </div>
             <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>23%</span>
          </div>
        </div>

        {/* Selling Amount */}
        <div style={{
          background: 'var(--alo-oscuro2)', 
          borderRadius: '12px', 
          border: '1px solid var(--alo-borde)', 
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '14px', color: 'var(--alo-gris)', margin: '0 0 16px', fontWeight: 500 }}>Ventas</h3>
          <p style={{ fontSize: '28px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 700 }}>$12.321</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <div style={{ 
               width: '32px', height: '32px', borderRadius: '50%', 
               background: 'rgba(239, 68, 68, 0.1)', display: 'flex', 
               alignItems: 'center', justifyContent: 'center', color: '#ef4444' 
             }}>
               <ArrowDownOutlined style={{ fontSize: '14px' }} />
             </div>
             <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>-12%</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminWalletPage;
