import React from 'react';

// Componentes de la LandingPage
import Header from '../components/Main/Header/Header';
import InfoSection from '../components/Main/InfoSection/InfoSection';
import ProductoDestacado from '../components/Main/ProductoDestacado/ProductoDestacado';
import Categorias from '../components/Main/Categorias/Categorias';
import DisenoComponent from '../components/Main/Diseno/Diseno';
import Referencias from '../components/Main/Referencias/Referencias';
import PreguntasFrecuentes from '../components/Main/PreguntasFrecuentes/PreguntasFrecuentes';
import FloatingButtons from '../components/Main/FloatingButtons/FloatingButtons';

import './LandingPage.css';
import '../styles/paleta4.css';

const LandingPage = () => {
  return (
    <>      
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
