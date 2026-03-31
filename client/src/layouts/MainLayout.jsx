import React from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from '../components/Main/Header/TopMenu';
import Footer from '../components/Main/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <TopMenu />
      <>
        <Outlet /> {/* Aquí se renderizarán LandingPage, TerminosCondicionesPage, etc. */}
      </>
      <Footer />
    </>
  );
};

export default MainLayout;

