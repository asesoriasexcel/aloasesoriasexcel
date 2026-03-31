import React from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaFileExcel, FaRobot, FaLock, FaRegFileAlt, FaFlag } from 'react-icons/fa';
import './TextTrain.css';

const TextTrain = () => {
  // Lista de textos con sus respectivos íconos
  const items = [
    { text: "Planillas automatizadas para cálculos precisos", icon: <FaCalculator /> },
    { text: "Macros personalizadas con botones para imprimir", icon: <FaFileExcel /> },
    { text: "Fórmulas innovadoras y probadas", icon: <FaRobot /> },
    { text: "Seguridad garantizada en todos los procesos", icon: <FaLock /> },
    { text: "Soporte en caso de necesitar ayuda", icon: <FaRegFileAlt /> },
    { text: "Producto 100% chileno y transparente", icon: <FaFlag /> },
  ];

  return (
    <div className="text-train-wrapper">
      <div className="fade-overlay fade-left"></div>
      <motion.div
        className="text-train"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 250, // Velocidad de la animación
          ease: "linear",
        }}
        style={{ display: 'flex' }} // Asegurarse de que los elementos estén en fila
      >
        {/* Duplicamos los elementos para que el movimiento sea continuo */}
        {items.concat(items).map((item, index) => (
          <div key={index} className="train-item">
            {item.icon} <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
      <div className="fade-overlay fade-right"></div>
    </div>
  );
};

export default TextTrain;
