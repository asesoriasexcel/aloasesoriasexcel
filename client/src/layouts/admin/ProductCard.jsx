import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, FileExcelOutlined, TagOutlined, FolderOutlined } from '@ant-design/icons';
import tiendaCategorias from '../../data/tiendaCategorias';

const GRADE_CLASS = {
  'Básico': 'basico',
  'Pro': 'pro',
  'Full': 'full',
  'Master': 'master',
  'Legendario': 'legendario',
};

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const cat = tiendaCategorias.find(
    (c) => String(c.id) === String(product.id_categoria)
  );
  const gradeClass = GRADE_CLASS[product.grado] ?? 'basico';

  return (
    <article 
      className="admin-product-card" 
      style={{ 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        minHeight: 'auto',
        border: '1px solid var(--admin-border)',
        borderRadius: '12px'
      }}
    >
      
      {/* Header matching image: Circle logo left, Title & Location right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '56px', height: '56px', borderRadius: '50%', 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid var(--admin-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', flexShrink: 0
        }}>
          {product.imagen ? (
            <img src={product.imagen} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <FileExcelOutlined style={{ fontSize: '24px', color: 'var(--alo-verde)' }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--admin-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.nombre}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-text-subtle)', fontSize: '12px' }}>
            <TagOutlined />
            <span style={{ fontFamily: 'monospace' }}>{product.id}</span>
          </div>
        </div>
      </div>

      {/* Body lines matching image (Email / Phone / etc.) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-secondary)', fontSize: '13px' }}>
          <FolderOutlined style={{ color: 'var(--admin-text-subtle)' }} />
          <span>{cat?.nombre ?? 'Sin categoría'}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-secondary)', fontSize: '13px' }}>
          <span style={{ color: 'var(--admin-text-subtle)', fontWeight: 'bold' }}>$</span>
          <span style={{ color: 'var(--alo-verde-claro)', fontWeight: 600 }}>
            {product.precio != null ? `$${product.precio.toLocaleString('es-CL')}` : '—'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
           <span style={{ color: 'var(--admin-text-subtle)' }}>•</span>
           <span className={`admin-grade-badge admin-grade-badge--${gradeClass}`}>
             {product.grado ?? '—'}
           </span>
           <div className="admin-status-pills" style={{ marginTop: 0, marginLeft: '8px' }}>
            {product.disponible ? (
              <span className="admin-status-pill admin-status-pill--active">Disponible</span>
            ) : (
              <span className="admin-status-pill admin-status-pill--paused">Pausado</span>
            )}
           </div>
        </div>
      </div>

      {/* Footer button matching image: Left aligned single action (or group) */}
      <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', gap: '8px' }}>
        <Button
          type="primary"
          className="btn-verde"
          style={{ borderRadius: '6px', fontSize: '12px', height: '32px', padding: '0 16px', fontWeight: 500 }}
          onClick={() => navigate(`/admin/producto/editar/${product.id}`)}
        >
          Editar detalle
        </Button>
        <Popconfirm
          title="¿Eliminar este producto?"
          onConfirm={() => onDelete(product.id)}
          okText="Eliminar"
          cancelText="Cancelar"
          placement="topRight"
        >
          <Button
            danger
            ghost
            style={{ borderRadius: '6px', fontSize: '12px', height: '32px', padding: '0 16px', border: 'none' }}
          >
            Eliminar
          </Button>
        </Popconfirm>
      </div>

    </article>
  );
};

export default ProductCard;
