import React from 'react';
import { Collapse } from 'antd';
import { FaHeadset } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './PreguntasFrecuentes.css';

const { Panel } = Collapse;

const faqData = [
  {
    key: '1',
    question: '¿Qué es Aló Asesorías Excel?',
    answer: 'Somos un equipo chileno experto en crear herramientas avanzadas en Excel. Nuestras planillas están diseñadas para facilitar procesos, especialmente en educación, con funcionalidades inteligentes y confiables.',
  },
  {
    key: '2',
    question: '¿Cómo funciona la compra?',
    answer: 'Realizas la compra en nuestra web y, en menos de 1 hora, recibirás el producto en tu correo electrónico, junto con dos (2) llaves de activación, la guía de activación y el video explicativo de uso para que puedas comenzar a usarlo sin problemas. Las llaves de activación permiten usar la planilla en un máximo de 2 dispositivos.',
  },
  {
    key: '3',
    question: '¿Cómo puedo pagar?',
    answer: 'Por ahora, solo aceptamos transferencias electrónicas. Al finalizar la compra te daremos los datos necesarios para completar tu pedido.',
  },
  {
    key: '4',
    question: '¿Puedo pedir un cambio o devolución?',
    answer: 'Al ser archivos digitales, no aceptamos cambios ni devoluciones. Por eso, revisa bien la ficha del producto y contáctanos si tienes dudas antes de comprar.',
  },
  {
    key: '5',
    question: '¿Qué pasa si no me sirve el producto?',
    answer: null, // Rendered manually for Link
  },
];

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

        <div className="preguntas-collapse-wrapper">
          <Collapse
            defaultActiveKey={['1']}
            ghost
            expandIconPosition="end"
            className="faq-collapse preguntas-collapse"
          >
            {faqData.map((item) => (
              <Panel
                header={<span className="faq-panel-title">{item.question}</span>}
                key={item.key}
                style={{
                  borderBottom: item.key !== String(faqData.length)
                    ? '1px solid var(--alo-borde)'
                    : 'none'
                }}
              >
                {item.answer ? (
                  <p style={{ color: 'var(--alo-gris)', margin: 0, fontSize: '14px', lineHeight: '1.6', paddingRight: '24px' }}>
                    {item.answer}
                  </p>
                ) : (
                  <p style={{ color: 'var(--alo-gris)', margin: 0, fontSize: '14px', lineHeight: '1.6', paddingRight: '24px' }}>
                    Puedes revisar el video explicativo antes de comprar. Si necesitas algo especial, puedes solicitar un diseño personalizado en nuestra sección de{' '}
                    <Link to="/diseno" style={{ color: 'var(--alo-verde-claro)', fontWeight: 600, textDecoration: 'none' }}>
                      Diseño y Personalización
                    </Link>.
                  </p>
                )}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
