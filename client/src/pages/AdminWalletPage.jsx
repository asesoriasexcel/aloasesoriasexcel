import React from 'react';
import { Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const transactionData = [
  { key: '1', name: 'Rasia', type: 'Sport', date: '14/05/2023', status: 'Paid', amount: 3321 },
  { key: '2', name: 'Trip', type: 'Shopping', date: '24/02/2023', status: 'Refund', amount: 1687 },
  { key: '3', name: 'Tiphanie', type: 'Sport', date: '06/09/2023', status: 'Paid', amount: 5691 },
  { key: '4', name: 'Moreen', type: 'Sport', date: '09/11/2022', status: 'Paid', amount: 3745 },
  { key: '5', name: 'Lorinda', type: 'Food', date: '10/08/2023', status: 'Cancel', amount: 4844 },
  { key: '6', name: 'Nella', type: 'Food', date: '07/04/2023', status: 'Cancel', amount: 3524 },
  { key: '7', name: 'Tirrell', type: 'Sport', date: '10/12/2022', status: 'Paid', amount: 5019 },
  { key: '8', name: 'Dunc', type: 'Sport', date: '18/08/2023', status: 'Paid', amount: 8574 },
  { key: '9', name: 'Obie', type: 'Sport', date: '21/10/2023', status: 'Paid', amount: 8276 },
  { key: '10', name: 'Kl', type: 'Shopping', date: '18/06/2023', status: 'Refund', amount: 4140 },
];

const columns = [
  { 
    title: 'Name', 
    dataIndex: 'name', 
    key: 'name', 
    render: text => <span style={{ color: 'var(--alo-blanco)' }}>{text}</span> 
  },
  { 
    title: 'Type', 
    dataIndex: 'type', 
    key: 'type', 
    render: text => <span style={{ color: 'var(--alo-gris)' }}>{text}</span> 
  },
  { 
    title: 'Date', 
    dataIndex: 'date', 
    key: 'date', 
    render: text => <span style={{ color: 'var(--alo-gris)' }}>{text}</span> 
  },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status', 
    render: status => {
      let color = 'var(--alo-verde-claro)';
      if (status === 'Refund') color = '#eab308'; // Amarillo
      if (status === 'Cancel') color = '#ef4444'; // Rojo
      return <span style={{ color, fontWeight: 500 }}>{status}</span>;
    } 
  },
  { 
    title: 'Amount', 
    dataIndex: 'amount', 
    key: 'amount', 
    render: amount => <span style={{ color: 'var(--alo-blanco)', fontWeight: 600 }}>${amount}</span> 
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
        borderRadius: '8px', 
        border: '1px solid var(--alo-borde)', 
        padding: '24px',
        overflow: 'hidden'
      }}>
        <h2 style={{ fontSize: '18px', color: 'var(--alo-blanco)', margin: '0 0 24px', fontWeight: 600 }}>
          Transaction history
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
          borderRadius: '8px', 
          border: '1px solid var(--alo-borde)', 
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '16px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 600 }}>
            Your Balance
          </h2>
          
          {/* Virtual Card */}
          <div style={{
            background: 'linear-gradient(135deg, var(--alo-verde), #083b1a)', 
            borderRadius: '16px',
            padding: '24px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}>
             {/* Círculos decorativos */}
             <div style={{ position: 'absolute', right: '-20px', top: '20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
             <div style={{ position: 'absolute', left: '-50px', bottom: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
             
             {/* Top info */}
             <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.8, letterSpacing: '0.5px' }}>Current Balance</p>
                  <p style={{ margin: '4px 0 0', fontSize: '26px', fontWeight: 700, letterSpacing: '1px' }}>$ 78,984</p>
                </div>
                {/* Logo CSS mock (Mantenemos los círculos que evocan tarjeta bancaria) */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', opacity: 0.9, position: 'relative', right: '-12px', zIndex: 2 }} />
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', opacity: 0.9, zIndex: 1 }} />
                </div>
             </div>

             {/* Bottom info (Datos ofuscados) */}
             <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <p style={{ margin: 0, fontSize: '18px', letterSpacing: '2.5px', fontWeight: 500 }}>**** **** **** 6547</p>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>**/**</p>
             </div>
          </div>
        </div>

        {/* Earning Amount */}
        <div style={{
          background: 'var(--alo-oscuro2)', 
          borderRadius: '8px', 
          border: '1px solid var(--alo-borde)', 
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '14px', color: 'var(--alo-gris)', margin: '0 0 16px', fontWeight: 500 }}>Earning Amount</h3>
          <p style={{ fontSize: '28px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 700 }}>$54,654.54</p>
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
          borderRadius: '8px', 
          border: '1px solid var(--alo-borde)', 
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '14px', color: 'var(--alo-gris)', margin: '0 0 16px', fontWeight: 500 }}>Selling Amount</h3>
          <p style={{ fontSize: '28px', color: 'var(--alo-blanco)', margin: '0 0 16px', fontWeight: 700 }}>$12,321.12</p>
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
