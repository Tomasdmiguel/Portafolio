import Link from "next/link";
const Nav = () => {
  

  return (
    <div className="bg-white dark:bg-black p-4 shadow-md font-serif">
      <nav className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <ul className="flex space-x-4 text-black dark:text-white">
            <Link href={"/"}>
              <li>Inicio</li>
            </Link>
            <Link href={"/proyectos"}>
            
            <li>Proyectos</li>
            </Link>

            <Link href={"/Skill"}>
              <li>Skill</li>
            </Link>

            <Link href={"/About"}>
                <li>Sobre Mi</li>
            </Link>
          </ul>
        </div>
        
      </nav>
    </div>
  );
};

export default Nav;
