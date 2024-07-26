import Proyectos from "../../helpers/proyectos";
interface Proyecto {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  repositorio: string;
}
const Proyects = () => {
  const proyectos: Proyecto[] = Proyectos;
  return (
    <div className="p-4">
      {proyectos.map((item, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{item.titulo}</h1>
          <p className="text-lg mb-2">{item.descripcion}</p>
          <div className="mb-2">
            <strong>Tecnologías:</strong>
            <ul className="list-disc ml-4">
              {item.tecnologias.map((tec, i) => (
                <li key={i} className="text-sm">
                  {tec}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={item.repositorio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline">
            Ver Repositorio
          </a>
        </div>
      ))}
    </div>
  );
};

export default Proyects;
