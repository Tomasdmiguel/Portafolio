"use client";
import React from "react";
import Proyectos from "../../helpers/proyectos";
import Link from "next/link";
import TitleProyectos from "../AnimatedTitle/Proyectos";
interface Proyecto {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  repositorio: string;
}
const Proyects: React.FC = () => {
  const proyectos: Proyecto[] = Proyectos;
  return (
    <div className="  bg-white py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
       <TitleProyectos/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {proyectos.map((proyecto, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden mt-12">
              <div className="p-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {proyecto.titulo}
                </h2>
                <p className="text-gray-600 mb-4 h-24 overflow-y-auto">
                  {proyecto.descripcion}
                </p>
                <div className="mb-4">
                  <strong className="text-gray-800">Tecnologías:</strong>
                  <div className="flex flex-wrap mt-2">
                    {proyecto.tecnologias.map((tec, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                        {tec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href={proyecto.repositorio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                    Ver Repositorio
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proyects;
