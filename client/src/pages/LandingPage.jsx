import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Main/Header/Header';
import InfoSection from '../components/Main/InfoSection/InfoSection';
import ProductoDestacado from '../components/Main/ProductoDestacado/ProductoDestacado';
import Categorias from '../components/Main/Categorias/Categorias';
import DisenoComponent from '../components/Main/Diseno/Diseno';
import Referencias from '../components/Main/Referencias/Referencias';
import PreguntasFrecuentes from '../components/Main/PreguntasFrecuentes/PreguntasFrecuentes';
import FloatingButtons from '../components/Main/FloatingButtons/FloatingButtons';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <>      
      <Helmet>
        <title>Aló Asesorías Excel | Soluciones precisas, en Excel y otras tecnologías.</title>
        <meta name="description" content="Venta de aplicaciones de educación en Excel y otras tecnologías. Herramientas diseñadas para optimizar el trabajo docente y administrativo." />
        <link rel="canonical" href="https://aloasesoriasexcel.cl/" />
      </Helmet>
      <Header />
      <InfoSection />
      <ProductoDestacado />
      <Categorias />
      <DisenoComponent />
      <Referencias />
      <PreguntasFrecuentes />
      <FloatingButtons />
    </>
  );
};

export default LandingPage;
