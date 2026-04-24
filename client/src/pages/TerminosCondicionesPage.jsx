import React, { useEffect } from 'react';
import { FileProtectOutlined } from '@ant-design/icons';

const TerminosCondicionesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '60px 24px', background: 'var(--alo-oscuro)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Contenedor Principal Limitado y centrado */}
      <div style={{ 
        maxWidth: '1100px', 
        width: '100%', 
        background: 'var(--alo-oscuro2)', 
        borderRadius: '8px', 
        border: '1px solid var(--alo-borde)', 
        padding: '40px' 
      }}>
        
        {/* Cabecera del Documento */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', borderBottom: '1px solid var(--alo-borde)', paddingBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(61, 184, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--alo-verde-claro)', fontSize: '28px', flexShrink: 0 }}>
            <FileProtectOutlined />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: 'var(--alo-blanco)', letterSpacing: '-0.02em' }}>
              Términos y Condiciones
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '15px', color: 'var(--alo-gris)' }}>
              Última actualización: Abril 2026
            </p>
          </div>
        </div>

        {/* Contenido Separado por Secciones Claras */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>1. Introducción</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Bienvenido a <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>AsesoríasExcel</span>. Al adquirir nuestros productos o utilizar nuestros servicios, aceptas estar sujeto a los siguientes Términos y Condiciones. Te recomendamos leerlos detenidamente antes de realizar una compra.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>2. Uso de los Productos</h2>
            <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Nuestras planillas están diseñadas para funcionar exclusivamente en <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>Excel para Windows, versión 2010 en adelante</span>, y están optimizadas para computadores de escritorio o laptops. No garantizamos el correcto funcionamiento en dispositivos móviles, sistemas operativos diferentes a Windows, o versiones de Office anteriores a 2010.
            </p>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Además, cada planilla incluye un máximo de <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>dos llaves de activación</span>, que permiten instalarla y usarla en dos computadores diferentes. Está <span style={{ color: '#ef4444', fontWeight: 500 }}>estrictamente prohibido</span> compartir o distribuir estas llaves de activación.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>3. Proceso de Compra</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Para realizar una compra, deberás completar el pedido en nuestro sitio web. Actualmente, aceptamos únicamente transferencias electrónicas. Una vez confirmado el pago, recibirás el producto en tu correo electrónico dentro de un plazo aproximado de <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>1 hora</span>, junto con las llaves de activación, la guía de instalación y el video explicativo de uso.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>4. Cambios y Devoluciones</h2>
            {/* Callout Visual para políticas críticas */}
            <div style={{ background: 'rgba(234, 179, 8, 0.05)', borderLeft: '3px solid #eab308', padding: '16px 20px', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
                Al tratarse de <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>archivos digitales</span>, no aceptamos cambios ni devoluciones. Por este motivo, te invitamos a revisar detalladamente la ficha del producto y el video explicativo antes de realizar la compra. Si tienes dudas, contáctanos para recibir orientación personalizada.
              </p>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>5. Diseño y Personalización</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Si necesitas un producto con características específicas, puedes solicitar un diseño personalizado en nuestra sección de <span style={{ color: 'var(--alo-blanco)', fontWeight: 500 }}>Diseño y Personalización</span>. Este servicio tiene un costo adicional y está sujeto a nuestras políticas de tiempo y entrega.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>6. Propiedad Intelectual</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Todos los productos, contenidos, y herramientas desarrolladas por AsesoríasExcel están protegidos por derechos de autor. Está <span style={{ color: '#ef4444', fontWeight: 500 }}>estrictamente prohibida</span> la distribución, copia o modificación no autorizada de nuestras planillas.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>7. Limitación de Responsabilidad</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              No nos hacemos responsables por el uso incorrecto de nuestras planillas ni por incompatibilidades técnicas derivadas de su uso en sistemas no especificados en estos términos. El cliente es responsable de asegurarse de cumplir con los requisitos técnicos antes de la compra.
            </p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--alo-blanco)', margin: '0 0 12px 0' }}>8. Contacto</h2>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.7' }}>
              Para consultas adicionales, puedes escribirnos a nuestro correo electrónico:{' '}
              <a href="mailto:aloasesoriasexcel@gmail.com" style={{ color: 'var(--alo-verde-claro)', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.8} onMouseOut={e => e.currentTarget.style.opacity = 1}>
                aloasesoriasexcel@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TerminosCondicionesPage;
