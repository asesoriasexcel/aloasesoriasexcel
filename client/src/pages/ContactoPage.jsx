import React, { useEffect } from 'react';

const ContactoPage = () => {
  useEffect(() => {
    // Seleccionar el elemento principal del contenido
    const bodyElement = document.getElementById('contacto-body'); // Nuevo ID para el cuerpo del contenido

    if (bodyElement) {
      // Si el elemento existe, desplazamos el scroll hasta él
      bodyElement.scrollIntoView({ behavior: 'auto' }); // 'auto' hace que el desplazamiento sea instantáneo
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <section className="contacto-section" id="contacto-body">
      <div className="centered-content">
        <h2 className="contacto-title">Contacto</h2>
        <p>Por favor, completa el formulario de abajo para ponerte en contacto con nosotros.</p>
        {/* Formulario de Google */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdB2nd0UMKTPVVTmJH0bwMCBP6mRl-Zw0d7BjBp0arl2xP6HQ/viewform?embedded=true"
          width="100%"
          height="1100"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Formulario de Contacto"
        >
          Cargando…
        </iframe>
      </div>
    </section>
  );
};

export default ContactoPage;
