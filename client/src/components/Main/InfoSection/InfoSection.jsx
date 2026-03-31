// InfoSection.js
import React from 'react';
import './InfoSection.css';
import { FaHandshakeSimple } from "react-icons/fa6";
import Grid from './Grid';

const InfoSection = () => {
  return (
    <section className="info-section seccion">
      <div className="centered-content">
        <div className="seccion-encabezado">
          <div className="header-centrado">
            <div className="icon-title"><FaHandshakeSimple /></div>
            <h2>
              <span>Simplifica tu Trabajo con</span>
              <span className="destacado">Nuestros Productos Únicos</span>
            </h2>
          </div>
        </div>
      
        <Grid />
        
      </div>
    </section>
  );
};

export default InfoSection;
