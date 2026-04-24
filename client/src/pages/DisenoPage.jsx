import React, { useEffect } from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, FormatPainterOutlined, MailOutlined, BulbOutlined } from '@ant-design/icons';
import disenoImage from '../images/diseno.jpg';
import '../layouts/admin/AdminTokens.css';
import '../layouts/admin/AdminComponents.css';

const DisenoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-shell" style={{ padding: '80px 24px', background: 'var(--alo-oscuro)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Contenedor principal centrado (Lectura General / Form) */}
      <div style={{ 
        maxWidth: '1100px', 
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        
        {/* Header / Hero Section adaptado de la Landing Page */}
        <div style={{ 
          background: 'var(--alo-oscuro2)', 
          borderRadius: '16px', 
          border: '1px solid var(--alo-borde)', 
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {/* Columna Izquierda (Imagen) */}
          <div style={{ flex: '1 1 400px', position: 'relative', minHeight: '300px', background: 'var(--alo-negro)' }}>
            <img 
              src={disenoImage} 
              alt="Diseño Personalizado" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
            />
            {/* Gradiente para fundir la imagen con el color del panel en pantallas grandes */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, var(--alo-oscuro2) 100%)' }} />
          </div>

          {/* Columna Derecha (Contenido Pitch) */}
          <div style={{ flex: '1 1 500px', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <Tag style={{ background: 'rgba(61, 184, 102, 0.1)', color: 'var(--alo-verde-claro)', borderColor: 'rgba(61, 184, 102, 0.3)', padding: '6px 14px', fontSize: '13px', borderRadius: '100px', fontWeight: 600, letterSpacing: '0.05em' }}>
                <FormatPainterOutlined style={{ marginRight: '8px' }} />
                SERVICIO VIP
              </Tag>
            </div>
            
            <h1 style={{ margin: '0 0 16px 0' }}>
              ¿Necesitas algo que no está en el catálogo?
            </h1>
            <p style={{ margin: '0 0 32px 0' }}>
              Te diseñamos la herramienta exacta para tu realidad. Sin plantillas genéricas, sin funciones que no usarás.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Cuéntanos lo que necesitas — sin formularios complicados',
                'Cotización en menos de 24 horas',
                'Iteramos contigo hasta que quede exacto',
                'Soporte incluido: si algo falla, lo resolvemos',
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircleOutlined style={{ color: 'var(--alo-verde-claro)', fontSize: '18px', marginTop: '2px' }} />
                  <span style={{ color: 'var(--alo-blanco)', fontSize: '15px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
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
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: 'var(--alo-blanco)' }}>Solicita tu cotización</h2>
            <p style={{ margin: 0, color: 'var(--alo-gris)', fontSize: '15px' }}>Escríbenos directamente y te enviaremos una propuesta a medida sin compromiso.</p>
          </div>

          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(61, 184, 102, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--alo-verde-claro)', 
            fontSize: '28px',
            marginTop: '8px'
          }}>
            <MailOutlined />
          </div>
          
          <div style={{ textAlign: 'center' }}>
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

        {/* Guía para escribir el correo */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: '12px', 
          border: '1px dashed var(--alo-borde)', 
          padding: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <BulbOutlined style={{ color: 'var(--alo-amarillo, #eab308)', fontSize: '24px' }} />
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)' }}>Consejos para redactar tu solicitud</h3>
          </div>
          <p style={{ margin: '0 0 20px 0' }}>
            Para poder entregarte una cotización precisa y rápida, te recomendamos incluir la siguiente información en tu correo:
          </p>
          <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--alo-gris)', fontSize: '15px', lineHeight: '1.8' }}>
            <li><strong style={{ color: 'var(--alo-blanco)', fontWeight: 600 }}>¿Cuál es tu necesidad principal?:</strong> Explícanos qué problema intentas resolver o qué proceso te quita más tiempo.</li>
            <li><strong style={{ color: 'var(--alo-blanco)', fontWeight: 600 }}>Expectativas y resultados:</strong> ¿Qué esperas que la herramienta haga por ti una vez terminada?</li>
            <li><strong style={{ color: 'var(--alo-blanco)', fontWeight: 600 }}>¿Cómo te imaginas la solución?:</strong> Si tienes una idea (ej. un panel de control, un formulario de ingreso de datos), ¡cuéntanosla!</li>
            <li><strong style={{ color: 'var(--alo-blanco)', fontWeight: 600 }}>Contexto de tu negocio (Opcional):</strong> Menciona a qué se dedica tu empresa para entender mejor tu realidad operativa.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DisenoPage;
