import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GrYoutube } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      {/* Columnas principales */}
      <div className="footer-content">

        {/* Columna 1 — Marca */}
        <div className="footer-column footer-column--brand">
          <span className="footer-logo">
            <span className="footer-logo_alo">Aló&nbsp;</span>
            <span className="footer-logo_asesoria">Asesorías&nbsp;</span>
            <span className="footer-logo_excel">Excel</span>
          </span>
          <span className="footer-subtitle">
            Soluciones precisas en Excel<br />y otras tecnologías digitales.
          </span>
          <div className="footer-social">
            <span className="footer-social-label">Síguenos</span>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61574372969450" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.youtube.com/@aloasesoriasexcel" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--youtube" aria-label="YouTube">
                <GrYoutube />
              </a>
              {/* <a href="https://www.instagram.com/aloasesoriasexcel" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--instagram" aria-label="Instagram">
                <FaInstagram />
              </a> */}
              {/* <a href="https://www.tiktok.com/@aloasesoriasexcel1" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--tiktok" aria-label="TikTok">
                <FaTiktok />
              </a> */}
            </div>
          </div>
        </div>

        {/* Columna 2 — Explorar */}
        <div className="footer-column">
          <span className="footer-title">Explorar</span>
          <Link to="/tienda" className="footer-link">Tienda de productos</Link>
          <Link to="/tienda/liberados" className="footer-link">Productos gratuitos</Link>
          <Link to="/diseno" className="footer-link">Diseño personalizado</Link>
          <a href="/#faq" className="footer-link">Preguntas frecuentes</a>
        </div>

        {/* Columna 3 — Legal */}
        <div className="footer-column">
          <span className="footer-title">Legal</span>
          <Link to="/terminoscondiciones" className="footer-link">Términos y Condiciones</Link>
          <Link to="/terminoscondiciones" className="footer-link">Política de privacidad</Link>
        </div>

        {/* Columna 4 — Contacto */}
        <div className="footer-column">
          <span className="footer-title">Contacto</span>
          <a href="mailto:aloasesoriasexcel@gmail.com" className="footer-link footer-link--mail">
            <IoIosMail className="footer-link-icon" />
            aloasesoriasexcel@gmail.com
          </a>
          <Link to="/contacto" className="footer-link">
            Enviar mensaje
          </Link>
        </div>

      </div>

      {/* Barra inferior */}
      <div className="footer-bottom">
        <span className="footer-bottom__copy">© 2025 Aló Asesorías Excel. Todos los derechos reservados.</span>
        <span className="footer-bottom__made">Hecho en Chile 🇨🇱</span>
      </div>
    </footer>
  );
};

export default Footer;
