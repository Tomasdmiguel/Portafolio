import React from "react";

const Contribuciones: React.FC = () => {
  const contribuciones = [
    {
      title: "Mis Contribuciones",
      imgSrc: "https://github-readme-stats.vercel.app/api?username=Tomasdmiguel&show_icons=true&theme=radical",
      alt: "GitHub Contributions"
    },
    {
      title: "Racha de Contribuciones",
      imgSrc: "https://github-readme-streak-stats.herokuapp.com/?user=Tomasdmiguel&theme=dark",
      alt: "GitHub Streak"
    },
    {
      title: "Lenguajes Más Usados",
      imgSrc: "https://github-readme-stats.vercel.app/api/top-langs/?username=Tomasdmiguel&layout=compact&theme=radical",
      alt: "Top Languages"
    }
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contribuciones.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h2>
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="w-full rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contribuciones;