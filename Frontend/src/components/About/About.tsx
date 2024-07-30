import Image from "next/image";
import ft from "../../assets/Profile.jpg";

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Tomas de Miguel
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-64 h-64 relative overflow-hidden rounded-full shadow-lg">
            <Image 
              src={ft} 
              alt="Foto de perfil" 
              layout="fill" 
              objectFit="cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              👋 Hola, soy Tomas, un Full Stack Developer con especialización en
              Front End. Desde la secundaria, cuando descubrí la programación,
              supe que quería dedicarme a este campo. Con experiencia en HTML,
              CSS, JavaScript, React, Next.js, Tailwind CSS, PostgreSQL, Node.js,
              Express, Vite, GIT y TypeScript, me enfoco en crear experiencias de
              usuario intuitivas y eficientes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              🏢 Trabajé en una inmobiliaria, donde desarrollé y mantuve un portal 
              web interactivo, mejorando la experiencia de usuario y la accesibilidad 
              de la información.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              💻 Aunque soy Full Stack Developer, mi verdadera pasión y
              especialización se encuentran en el Front End, donde puedo aplicar
              mi creatividad y habilidades técnicas para diseñar interfaces de
              usuario atractivas y funcionales.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              🎯 Mi objetivo es seguir creciendo en el desarrollo web, contribuyendo 
              con mis habilidades técnicas y creatividad a proyectos desafiantes e innovadores.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;