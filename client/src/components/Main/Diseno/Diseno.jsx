import React from 'react';
import { Tag, Typography, List, Button, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons'; // Importa el icono
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import './Diseno.css';
import disenoImage from '../../../images/diseno.jpg';

const { Title, Text } = Typography;

const Diseno = () => {
  return (
    <section className="diseno-section seccion">
      <Row className="centered-content" gutter={[16, 16]} align="middle">
        {/* Columna Izquierda con Imagen */}
        <Col xs={24} md={12} className="image-container">
          <img src={disenoImage} alt="Diseño" className="diseno-image" />
        </Col>

        {/* Columna Derecha con Contenido */}
        <Col xs={24} md={12} className="content-container">
          <Tag color="blue" className="tag-label">Diseño</Tag>
          <Title level={2} className="diseno-title">Diseñamos la herramienta perfecta para ti</Title>
          <Text className="diseno-subtitle">
            ¿Tienes necesidades específicas? Te ayudamos a crear planillas personalizadas que se adaptan a tu forma de trabajar.
          </Text>
          <List
            className="diseno-list"
            dataSource={[
              'Indicamos tus requerimientos',
              'Recibe cotización en menos de 24 horas',
              'Trabajamos contigo para perfeccionar la solución',
              'Obtén una planilla que supera tus expectativas',
            ]}
            renderItem={(item) => (
              <List.Item>
                <CheckCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} /> {/* Icono de check */}
                {item}
              </List.Item>
            )}
          />
          <Link to="/diseno">
            <Button 
              type="primary" 
              className="diseno-button btn-azul"
            >
              Comenzar Ahora
            </Button>
          </Link>
        </Col>
      </Row>
    </section>
  );
};

export default Diseno;
