import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold">Reserva Gol</p>
            <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} className="text-white hover:text-gray-400" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="text-white hover:text-gray-400" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="text-white hover:text-gray-400" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} className="text-white hover:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
