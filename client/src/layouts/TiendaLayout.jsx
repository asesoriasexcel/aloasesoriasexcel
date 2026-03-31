import React from 'react';
import { Outlet } from 'react-router-dom';

const TiendaLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default TiendaLayout;
