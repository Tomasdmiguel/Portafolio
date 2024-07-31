import Image from "next/image";
import Link from "next/link";
import github from "../../assets/github.png";
import lk from "../../assets/linkedin.png";
import AnimatedTitle from "../AnimatedTitle/AnimatedTitle";

const Bienvenida = () => {
  return (
    <main className="flex flex-col items-center justify-center py-16 px-4">
      <div className="absolute top-20 mt-34 md:top-24">
       
        <AnimatedTitle/>
      </div>
      
      <div className="mt-32 md:mt-36 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-2">
          Soy Tomas de Miguel
        </h2>
        <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-4">
          Full Stack especializado en Front End
        </h3>
        <p className="text-base md:text-lg text-gray-500 mb-8">oteguit31@gmail.com</p>
      </div>

      <div className="flex space-x-6 mb-8 mt-9">
        <Link
          href="https://github.com/Tomasdmiguel"
          target="_blank"
          rel="noopener noreferrer">
          <Image src={github} alt="Github" className="w-12 h-12 md:w-14 md:h-14 transition-transform transform hover:scale-110" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/tomas-de-miguel-2912342b5/"
          target="_blank"
          rel="noopener noreferrer">
          <Image src={lk} alt="Linkedin" className="w-12 h-12 md:w-14 md:h-14 transition-transform transform hover:scale-110" />
        </Link>
      </div>
    </main>
  );
};

export default Bienvenida;