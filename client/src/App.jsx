import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';

// Páginas
import LandingPage from './pages/LandingPage';
import TiendaPage from './pages/TiendaPage';
import ProductoPage from './pages/ProductoPage';
import CarritoPage from './pages/CarritoPage';
import ConfirmarCompraPage from './pages/ConfirmarCompraPage';
import ContactoPage from './pages/ContactoPage';
import DisenoPage from './pages/DisenoPage';
import TerminosCondicionesPage from './pages/TerminosCondicionesPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductForm from './pages/AdminProductForm';
import AdminWalletPage from './pages/AdminWalletPage';
import AdminFaqPage from './pages/AdminFaqPage';
import MisComprasPage from './pages/MisComprasPage';
import AdminVentasPage from './pages/AdminVentasPage';

// Layouts
import MainLayout from './layouts/MainLayout';
import AppShell from './layouts/AppShell';

import './App.css';

import { ConfigProvider, theme, App as AntApp } from 'antd';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1a8a4a', 
          borderRadius: 6,
        },
      }}
    >
      <AntApp>
        <Router>
          <ScrollToTop />
          <div className="app-container">
          <Routes>
            {/* Landing y páginas con TopMenu + Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/terminoscondiciones" element={<TerminosCondicionesPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/diseno" element={<DisenoPage />} />
            </Route>

            {/* Shell único: sidebar persistente para tienda + admin */}
            <Route element={<AppShell />}>
              <Route path="/tienda" element={<TiendaPage />} />
              <Route path="/tienda/categoria/:id_categoria" element={<TiendaPage />} />
              <Route path="/tienda/subcategoria/:id_subcategoria" element={<TiendaPage />} />
              <Route path="/tienda/liberados" element={<TiendaPage />} />
              <Route path="/producto/:id" element={<ProductoPage />} />
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/confirmacompra" element={<ConfirmarCompraPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/producto/nuevo" element={<AdminProductForm />} />
              <Route path="/admin/producto/editar/:id" element={<AdminProductForm />} />
              <Route path="/admin/wallet" element={<AdminWalletPage />} />
              <Route path="/admin/faq" element={<AdminFaqPage />} />
              <Route path="/admin/miscompras" element={<MisComprasPage />} />
              <Route path="/admin/ventas" element={<AdminVentasPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
