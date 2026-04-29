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
        <span className="text">
          Productos liberados disponibles
          <HiMiniRocketLaunch />
          <Link to="/tienda/liberados" className="liberadas">
            <strong>Ver productos</strong>
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
