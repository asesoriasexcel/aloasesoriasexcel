import React from 'react';
import referenciasData from '../../../data/referenciasData';  // Importamos los datos
import { FaQuoteLeft } from "react-icons/fa";
import './Referencias.css';

const Referencias = () => {
  // Dividir los datos en 3 columnas
  const primeraColumna = referenciasData.slice(0, 3); 
  const segundaColumna = referenciasData.slice(3, 8); 
  const terceraColumna = referenciasData.slice(8, 11); 

  return (
    <section className="referencias-section seccion">

      {/* Onda superior: entra desde la sección Diseño (blanco) */}
      <div className="referencias-wave referencias-wave--top" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,0 L0,0 Z" fill="var(--seccion_diseno_fondo)" />
        </svg>
      </div>

      <div className="centered-content">
        
        <div className="seccion-encabezado">
          <div className="header-centrado">
            <div className="referencias-icon" style = {{ marginTop: "60px" }}><FaQuoteLeft /></div>
            <h2>Historias Reales, Resultados Reales Nuestros Clientes</h2>
            <p>Descubre cómo nuestras soluciones han transformado experiencias a través de testimonios auténticos de nuestros valiosos clientes.</p>
          </div>
        </div>

        <div className="referencias-rows">
          {/* Primera columna */}
          <div className="referencias-column">
            {primeraColumna.map((referencia) => (
              <div key={referencia.id} className="referencias-card">
                <div className="referencias-words">
                  <p>{referencia.quote}</p>
                </div>
                <div className="referencias-person">
                  <div className="referencias-avatar">
                    <img src={referencia.avatar} alt={referencia.name} className="avatar-image" />
                  </div>
                  <div className="referencias-info">
                    <div className="referencias-name">{referencia.name}</div>
                    <div className="referencias-job">{referencia.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Segunda columna */}
          <div className="referencias-column">
            {/* Primera tarjeta que ocupa el ancho de las dos columnas */}
            <div className="referencias-card">
              <div className="referencias-words">
                <p>{segundaColumna[0].quote}</p>
              </div>
              <div className="referencias-person">
                <div className="referencias-avatar">
                  <img src={segundaColumna[0].avatar} alt={segundaColumna[0].name} className="avatar-image" />
                </div>
                <div className="referencias-info">
                  <div className="referencias-name">{segundaColumna[0].name}</div>
                  <div className="referencias-job">{segundaColumna[0].job}</div>
                </div>
              </div>
            </div>

            {/* Dividir el espacio restante en dos columnas para las siguientes tarjetas */}
            <div className="referencias-column-2">
              {segundaColumna.slice(1).map((referencia) => (
                <div key={referencia.id} className="referencias-card">
                  <div className="referencias-words">
                    <p>{referencia.quote}</p>
                  </div>
                  <div className="referencias-person">
                    <div className="referencias-avatar">
                      <img src={referencia.avatar} alt={referencia.name} className="avatar-image" />
                    </div>
                    <div className="referencias-info">
                      <div className="referencias-name">{referencia.name}</div>
                      <div className="referencias-job">{referencia.job}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tercera columna */}
          <div className="referencias-column">
            {terceraColumna.map((referencia) => (
              <div key={referencia.id} className="referencias-card">
                <div className="referencias-words">
                  <p>{referencia.quote}</p>
                </div>
                <div className="referencias-person">
                  <div className="referencias-avatar">
                    <img src={referencia.avatar} alt={referencia.name} className="avatar-image" />
                  </div>
                  <div className="referencias-info">
                    <div className="referencias-name">{referencia.name}</div>
                    <div className="referencias-job">{referencia.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onda inferior: transición hacia la sección FAQ (blanco) */}
      <div className="referencias-wave referencias-wave--bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C180,0 360,80 540,40 C720,0 900,80 1080,40 C1260,0 1380,60 1440,40 L1440,80 L0,80 Z" fill="var(--seccion_faq_fondo)" />
        </svg>
      </div>

    </section>
  );
};

export default Referencias;
