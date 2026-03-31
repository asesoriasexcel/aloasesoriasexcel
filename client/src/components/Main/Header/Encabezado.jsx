
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import './Encabezado.css';

const Encabezado = () => {


    const whatsappUrl = "https://wa.me/56981605147?text=%C2%A1Hola%20Bazar%20Multicolor!%20tengo%20una%20consulta:";


    return (
        <div className='bg_gradiante_1 encabezado-container'>
            <div className='logo-container'>
                <Link to="/home" className='logo-container-link'>
     
                    <p>Bazar <span>Multicolor</span></p>
                </Link>
            </div>
            <div className="encabezado-menu">
                <div className="encabezado-start">
                    <FaBars size={24} style={{ marginRight: '10px', display: 'none' }} />
                    <div className="p-input-icon-left">
                        <FaSearch className="search-icon" />
                        <span className="buscador-toggle">
                            Buscar productos
                        </span>
                    </div>
                </div>
                <div className="encabezado-icons">
                    <Link to="/carrito" className="encabezado-icon">
                        <FaShoppingCart size={24} />
 
                    </Link>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="encabezado-icon">
                        <FaWhatsapp size={24} />
                    </a>
                </div>
            </div>

            

            <Dialog header="Tienes artículos en tu carrito!"  >
                <p>¿Qué deseas hacer?</p>
                <div className="modal-buttons">
                    <Button label="Ya compré estos artículos" icon="pi pi-heart"  className="p-button-vaciar" />
                    <Button label="Continuar comprando" icon="pi pi-arrow-right"  className="p-button-continuar"/>
                </div>
            </Dialog>

            
        </div>
    );
};

export default Encabezado;
