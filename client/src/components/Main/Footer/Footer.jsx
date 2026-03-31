import React from 'react'; 
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GrYoutube } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        {/* Columna 1 */}
        <div className="footer-column">
          <span className="footer-title">
            <span className="footer-title_a">Asesorias</span>
            <span className="footer-title_b">Excel</span>
          </span>
          <span className="footer-subtitle">Soluciones en Excel y Otras Tecnologías.</span>
          <span>Síguenos</span>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61566069431755&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="footer-facebook" />
            </a>
            <a href="https://www.youtube.com/@aloasesoriasexcel" target="_blank" rel="noopener noreferrer">
              <GrYoutube className="footer-youtube" />
            </a>
            <a href="https://www.instagram.com/aloasesoriasexcel" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer-instagram" />
            </a>
            <a href="https://www.tiktok.com/@aloasesoriasexcel1" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="footer-tiktok" />
            </a>
          </div>
          <span className="copyright">© AsesoriasExcel 2025.</span>
        </div>

        {/* Columna 2 */}
        <div className="footer-column">
          <span className="footer-title important">IMPORTANTE</span>
          <Link to="/terminoscondiciones" className="contactostyle" >
            <span>Términos y Condiciones</span>
          </Link>
        </div>

        {/* Columna 3 */}
        <div className="footer-column">
          <span className="footer-title contact">Contáctanos</span>
          <Link className="contactostyle" to="/contacto">
            <IoMdSend className="footer-mail" />
            Mensaje
          </Link>
          <a href="mailto:asesoriasexcel@gmail.com" className="contactostyle">
            <IoIosMail className="footer-mail" />
            aloasesoriasexcel@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
