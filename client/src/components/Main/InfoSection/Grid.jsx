// Grid.js
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Grid.css';
import { cardInfo } from '../../../data/infoseccion';

const INTERVAL = 2800;

const Grid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardInfo.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const card = cardInfo[currentIndex];

  return (
    <section className="grid-section">
      <div className="grid-rotating">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="grid-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ opacity: { duration: 0.35 }, y: { duration: 0.35 } }}
          >
            <div className="icon"><card.icon /></div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de posición */}
        <div className="grid-dots">
          {cardInfo.map((_, i) => (
            <button
              key={i}
              className={`grid-dot${i === currentIndex ? ' grid-dot--active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ver ${cardInfo[i].title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid;
