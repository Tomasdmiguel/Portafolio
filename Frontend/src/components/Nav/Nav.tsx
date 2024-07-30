"use client";
import Link from "next/link";
import { useState } from "react";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-black p-4 shadow-md font-serif">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-2xl font-bold animate-bounce">
          <Link href={"/"}>
          <span className="text-indigo-600">Developer</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Inicio
          </Link>
          <Link
            href="/proyectos"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Proyectos
          </Link>
          <Link
            href="/Skill"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Skill
          </Link>
          <Link
            href="/About"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Sobre Mi
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link
            href="/"
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Inicio
          </Link>
          <Link
            href="/proyectos"
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Proyectos
          </Link>
          <Link
            href="/Skill"
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Skill
          </Link>
          <Link
            href="/About"
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Sobre Mi
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
