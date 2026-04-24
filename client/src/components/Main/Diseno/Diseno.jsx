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
          <Tag color="blue" className="tag-label">Personalizado</Tag>
          <Title level={2} className="diseno-title">¿Necesitas algo que no está en el catálogo?</Title>
          <Text className="diseno-subtitle">
            Te diseñamos la herramienta exacta para tu realidad. Sin plantillas genéricas, sin funciones que no usarás.
          </Text>
          <List
            className="diseno-list"
            dataSource={[
              'Cuéntanos lo que necesitas — sin formularios complicados',
              'Cotización en menos de 24 horas',
              'Iteramos contigo hasta que quede exacto',
              'Soporte incluido: si algo falla, lo resolvemos',
            ]}
            renderItem={(item) => (
              <List.Item>
                <CheckCircleOutlined style={{ color: '#52d17c', marginRight: '10px' }} />
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
