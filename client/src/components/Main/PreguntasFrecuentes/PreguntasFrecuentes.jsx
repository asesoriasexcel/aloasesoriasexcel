import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FaHeadset } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Importar Link para navegación
import './PreguntasFrecuentes.css';

const PreguntasFrecuentes = () => {
  return (
    <section className="preguntas-section seccion">
      <div className="centered-content">
        <div className="seccion-encabezado">
          <div className="header-centrado">
            <div className="icon-title"><FaHeadset /></div>
            <h2>¿Es tu primera vez?</h2>
            <p>¡Si tienes dudas, aquí las resolvemos!</p>
          </div>
        </div>
        <Accordion>
          <AccordionTab header="¿Qué es AsesoríasExcel?">
            <p>Somos un equipo chileno experto en crear herramientas avanzadas en Excel. Nuestras planillas están diseñadas para facilitar procesos, especialmente en educación, con funcionalidades inteligentes y confiables</p>
          </AccordionTab>
        </Accordion>
        <Accordion>
        <AccordionTab header="¿Cómo funciona la compra?">
          <p>Realizas la compra en nuestra web y, en menos de 1 hora, recibirás el producto en tu correo electrónico, junto con <b>dos (2) llaves de activación</b>, la <b>guía de activación</b> y el <b>video explicativo de uso</b> para que puedas comenzar a usarlo sin problemas. Las llaves de activación permiten usar la planilla en un máximo de 2 dispositivos.</p>
        </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Cómo puedo comprar?">
            <p>Por ahora, solo aceptamos transferencias electrónicas. Al finalizar la compra te daremos los datos necesarios para completar tu pedido</p>
          </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Puedo pedir un cambio o devolución?">
            <p>Al ser archivos digitales, no aceptamos cambios ni devoluciones. Por eso, revisa bien la ficha del producto y contáctanos si tienes dudas antes de comprar.</p>
          </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Qué pasa si no me sirve el producto?">
            <p>Puedes revisar el video explicativo antes de comprar. Si necesitas algo especial, puedes solicitar un diseño personalizado en nuestra sección de <Link to="/diseno" style={{ color: 'var(--especial)', fontWeight: '700', textDecoration: 'none' }}>Diseño y Personalización</Link>.</p>
          </AccordionTab>
        </Accordion>
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
