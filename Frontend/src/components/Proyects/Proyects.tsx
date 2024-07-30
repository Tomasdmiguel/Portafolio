"use client"
import React, { useState } from 'react';
import Proyectos from "../../helpers/proyectos";
import Link from 'next/link';

interface Proyecto {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  repositorio: string;
}

const Proyects = () => {
  const proyectos: Proyecto[] = Proyectos;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= proyectos.length ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? proyectos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-white tracking-wider">Proyectos</h1>
      <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 h-[400px] overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{proyectos[currentIndex].titulo}</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">{proyectos[currentIndex].descripcion}</p>
          <div className="mb-4">
            <strong className="text-gray-800">Tecnologías:</strong>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              {proyectos[currentIndex].tecnologias.map((tec, i) => (
                <li key={i} className="text-sm text-gray-700">{tec}</li>
              ))}
            </ul>
          </div>
          <Link
            href={proyectos[currentIndex].repositorio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Ver Repositorio
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={prevProject} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-l transition duration-300">
          Anterior
        </button>
        <button onClick={nextProject} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-r transition duration-300">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Proyects;