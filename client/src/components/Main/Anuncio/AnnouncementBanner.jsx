import React, { useState } from "react"; 
import { IoCloseOutline } from "react-icons/io5";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "./AnnouncementBanner.css";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="banner">
        <div>.</div>
        <span className="text">
          Planillas de Lanzamiento
          <HiMiniRocketLaunch />
          <Link to="/tienda/liberados" className="liberadas"> {/* Cambio aquí */}
            <strong>Ver Liberadas</strong>
          </Link>
        </span>
        <button className="closeButton" onClick={handleClose}>
          <IoCloseOutline />
        </button>
      </div>
    )
  );
};

export default AnnouncementBanner;
