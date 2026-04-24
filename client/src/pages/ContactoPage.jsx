import React, { useEffect } from 'react';
import { MailOutlined } from '@ant-design/icons';
import '../layouts/admin/AdminTokens.css';
import '../layouts/admin/AdminComponents.css';

const ContactoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-shell" style={{ padding: '80px 24px', background: 'var(--alo-oscuro)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Contenedor centrado con max-width reducido para una mejor lectura */}
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '40px'
      }}>
        
        {/* Cabecera */}
        <div>
          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 700, color: 'var(--alo-blanco)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Ponte en contacto
          </h1>
          <p style={{ margin: 0, fontSize: '16px', color: 'var(--alo-gris)', lineHeight: '1.6' }}>
            ¿Tienes alguna pregunta, sugerencia o necesitas ayuda con alguna de nuestras planillas? Escríbenos directamente y te responderemos lo antes posible.
          </p>
        </div>

        {/* Tarjeta de Contacto Directo */}
        <div style={{ 
          width: '100%', 
          background: 'var(--alo-oscuro2)', 
          border: '1px solid var(--alo-borde)', 
          borderRadius: '12px', 
          padding: '40px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(61, 184, 102, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--alo-verde-claro)', 
            fontSize: '28px' 
          }}>
            <MailOutlined />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--alo-gris)', marginBottom: '8px' }}>Email directo</p>
            <a 
              href="mailto:aloasesoriasexcel@gmail.com" 
              style={{ 
                margin: 0, 
                fontSize: '22px', 
                fontWeight: 600, 
                color: 'var(--alo-blanco)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--alo-verde-claro)'} 
              onMouseOut={e => e.currentTarget.style.color = 'var(--alo-blanco)'}
            >
              aloasesoriasexcel@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactoPage;
