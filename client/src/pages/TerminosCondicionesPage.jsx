import React, { useEffect } from 'react';
import './TerminosCondicionesPage.css'; // Asegúrate de tener estos estilos en el archivo CSS correspondiente

const TerminosCondicionesPage = () => {
  useEffect(() => {
    // Seleccionar el elemento principal del contenido
    const bodyElement = document.getElementById('terminos-body'); // Nuevo ID para el cuerpo del contenido

    if (bodyElement) {
      // Si el elemento existe, desplazamos el scroll hasta él
      bodyElement.scrollIntoView({ behavior: 'auto' }); // 'auto' hace que el desplazamiento sea instantáneo
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <section className="terminos-section" id="terminos-body">
      <div className="centered-content">
        <h1 className="terminos-title">Términos y Condiciones</h1>

        <div className="terminos-content">
          {/* Introducción */}
          <h2>1. Introducción</h2>
          <p>
            Bienvenido a <b>AsesoríasExcel</b>. Al adquirir nuestros productos o utilizar nuestros servicios, aceptas estar sujeto a los siguientes <b>Términos y Condiciones</b>. Te recomendamos leerlos detenidamente antes de realizar una compra.
          </p>

          {/* Uso del Producto */}
          <h2>2. Uso de los Productos</h2>
          <p>
            Nuestras planillas están diseñadas para funcionar exclusivamente en <b>Excel para Windows, versión 2010 en adelante</b>, y están optimizadas para <b>computadores de escritorio</b> o <b>laptops</b>. No garantizamos el correcto funcionamiento en <b>dispositivos móviles</b>, <b>sistemas operativos diferentes a Windows</b>, o <b>versiones de Office anteriores a 2010</b>.
          </p>
          <p>
            Además, cada planilla incluye un máximo de <b>dos llaves de activación</b>, que permiten instalarla y usarla en <b>dos computadores diferentes</b>. Está <b>estrictamente prohibido</b> compartir o distribuir estas llaves de activación.
          </p>

          {/* Proceso de Compra */}
          <h2>3. Proceso de Compra</h2>
          <p>
            Para realizar una compra, deberás completar el pedido en nuestro sitio web. Actualmente, aceptamos únicamente <b>transferencias electrónicas</b>. Una vez confirmado el pago, recibirás el producto en tu correo electrónico dentro de un plazo aproximado de <b>1 hora</b>, junto con dos(2) llaves de activación, la <b>guía de activación</b> y el <b>video explicativo de uso</b>.
          </p>

          {/* Política de Reembolsos */}
          <h2>4. Cambios y Devoluciones</h2>
          <p>
            Al tratarse de <b>archivos digitales</b>, no aceptamos <b>cambios ni devoluciones</b>. Por este motivo, te invitamos a revisar detalladamente la <b>ficha del producto</b> y el <b>video explicativo</b> antes de realizar la compra. Si tienes dudas, <b>contáctanos</b> para recibir orientación personalizada.
          </p>

          {/* Personalización */}
          <h2>5. Diseño y Personalización</h2>
          <p>
            Si necesitas un producto con características específicas, puedes solicitar un <b>diseño personalizado</b> en nuestra sección de <b>Diseño y Personalización</b>. Este servicio tiene un <b>costo adicional</b> y está sujeto a nuestras políticas de <b>tiempo</b> y <b>entrega</b>.
          </p>

          {/* Propiedad Intelectual */}
          <h2>6. Propiedad Intelectual</h2>
          <p>
            Todos los productos, contenidos, y herramientas desarrolladas por <b>AsesoríasExcel</b> están protegidos por <b>derechos de autor</b>. Está <b>estrictamente prohibida</b> la distribución, copia o modificación no autorizada de nuestras planillas.
          </p>

          {/* Limitación de Responsabilidad */}
          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            No nos hacemos responsables por el <b>uso incorrecto</b> de nuestras planillas ni por incompatibilidades técnicas derivadas de su uso en <b>sistemas no especificados</b> en estos términos. El cliente es responsable de asegurarse de cumplir con los <b>requisitos técnicos</b> antes de la compra.
          </p>
          
          {/* Contacto */}
          <h2>8. Contacto</h2>
          <p>
            Para consultas adicionales, puedes escribirnos a nuestro correo electrónico: <b>aloasesoriasexcel@gmail.com</b>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TerminosCondicionesPage;
