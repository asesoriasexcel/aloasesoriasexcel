import React, { useEffect } from 'react';
import './ContactoPage.css'; // Asegúrate de tener estos estilos en el archivo CSS correspondiente

const DisenoPage = () => {
  useEffect(() => {
    // Seleccionar el elemento principal del contenido
    const bodyElement = document.getElementById('diseno-body'); // Nuevo ID para el cuerpo del contenido

    if (bodyElement) {
      // Si el elemento existe, desplazamos el scroll hasta él
      bodyElement.scrollIntoView({ behavior: 'auto' }); // 'auto' hace que el desplazamiento sea instantáneo
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <section className="contacto-section" id="diseno-body">
      <div className="centered-content">
        <h2 className="contacto-title">Diseño y Personalización</h2>
        <p></p>

        {/* Formulario de Google */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdn3xdlG99JNKTxJ4c52U1zt3zIuEj1t63f_Z4DbzMwr5QO4w/viewform?embedded=true"
          width="100%"
          height="2400"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Formulario de Contacto"
          className='iframe-contacto'
        >
          Cargando…
        </iframe>
      </div>
    </section>
  );
};

export default DisenoPage;
