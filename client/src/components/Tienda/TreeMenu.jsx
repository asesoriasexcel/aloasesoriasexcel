import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoGridOutline } from 'react-icons/io5';
import { Tree, Folder, File } from '../ui/file-tree';
import logo from '../../images/logo/logo4.png';
import tiendaSubcategorias from '../../data/tiendaSubcategorias';
import './TreeMenu.css';

const TreeMenu = ({ onSelect, onMostrarTodo, selectedId, categories = [], products = [] }) => {
  const handleSelect = (id) => {
    if (onSelect) onSelect(id);
  };

  return (
    <div className="TreeMenu-container">
      <div className="TreeMenu-container-img">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="TreeMenu-container-volver">
        <Link to="/">
          <AiOutlineHome />
          <span>Volver al inicio</span>
        </Link>
      </div>

      <div className="TreeMenu-container-mostrar" onClick={onMostrarTodo}>
        <IoGridOutline />
        <span>Mostrar todo</span>
      </div>

      <div className="TreeMenu-container-tree">
        <Tree
          initialSelectedId={selectedId}
          initialExpandedItems={categories.map((c) => `cat-${c.id}`)}
          onSelect={handleSelect}
          indicator={true}
          className="treemenu-file-tree"
        >
          {categories.map((categoria) => {
            const totalCat = products.filter(
              (p) => String(p.categoria) === String(categoria.id)
            ).length;

            const subcats = tiendaSubcategorias.filter(
              (s) => String(s.id_categoria) === String(categoria.id)
            );

            return (
              <Folder
                key={`cat-${categoria.id}`}
                value={`cat-${categoria.id}`}
                element={`${categoria.nombre} (${totalCat})`}
                className="treemenu-folder"
              >
                {subcats.map((sub) => (
                  <File
                    key={`sub-${sub.id}`}
                    value={`sub-${sub.id}`}
                    className="treemenu-file"
                  >
                    <span>{sub.nombre}</span>
                  </File>
                ))}
              </Folder>
            );
          })}
        </Tree>
      </div>
    </div>
  );
};

export default TreeMenu;
