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

// Layouts
import MainLayout from './layouts/MainLayout';
import TiendaLayout from './layouts/TiendaLayout';

import './App.css';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* Rutas */}
        <Routes>
          {/* Rutas con elementos comunes para el exterior del sitio */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terminoscondiciones" element={<TerminosCondicionesPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/diseno" element={<DisenoPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/producto/nuevo" element={<AdminProductForm />} />
            <Route path="/admin/producto/editar/:id" element={<AdminProductForm />} />
          </Route>

          {/* Rutas con elementos comunes para el interior del sitio */}
          <Route element={<TiendaLayout />}>
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/tienda/categoria/:id_categoria" element={<TiendaPage />} />
            <Route path="/tienda/subcategoria/:id_subcategoria" element={<TiendaPage />} />
            <Route path="/tienda/liberados" element={<TiendaPage />} />
            <Route path="/producto/:id" element={<ProductoPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/confirmacompra" element={<ConfirmarCompraPage />} />
          </Route>

          {/* Redirección 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
