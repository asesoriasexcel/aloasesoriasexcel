import { FaCogs, FaUserTie, FaHandsHelping, FaBuilding, FaUsers } from "react-icons/fa";

const categorias = [
  {
    id: 1,
    titulo: "Jefe de UTP",
    descripcion: "Fundamental para garantizar la calidad educativa y supervisar el trabajo de los docentes.",
    icono: <FaCogs />
  },
  {
    id: 2,
    titulo: "Docente",
    descripcion: "Aplicando métodos innovadores de evaluación adaptados a las necesidades de los alumnos.",
    icono: <FaUserTie />
  },
  {
    id: 3,
    titulo: "Profesor Jefe",
    descripcion: "Para un acompañamiento cercano y pedagógico para el desarrollo personal y académico.",
    icono: <FaHandsHelping />
  },
  {
    id: 4,
    titulo: "Administrativo/Jefatura",
    descripcion: "Optimiza la gestión directiva y administrativa de tu institución con herramientas precisas.",
    icono: <FaBuilding />
  },
  {
    id: 5,
    titulo: "Convivencia Escolar",
    descripcion: "Herramientas diseñadas para el seguimiento y mejora del clima escolar y bienestar estudiantil.",
    icono: <FaUsers />
  },
];

export default categorias;
