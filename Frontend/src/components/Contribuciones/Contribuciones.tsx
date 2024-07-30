import React from "react";

const Constribuciones: React.FC = () => {
  return (
    <div className="p-8  bg-white">
      <h1 className="text-4xl font-bold text-center mb-8">
        Mis Contribuciones
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Mis Contribuciones</h2>
          <img
            src="https://github-readme-stats.vercel.app/api?username=Tomasdmiguel&show_icons=true&theme=radical"
            alt="GitHub Contributions"
            className="w-full"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Racha de Contribuciones
          </h2>
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=Tomasdmiguel&theme=dark"
            alt="GitHub Streak"
            className="w-full"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Lenguajes Más Usados</h2>
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=Tomasdmiguel&layout=compact&theme=radical"
            alt="Top Languages"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Constribuciones;
