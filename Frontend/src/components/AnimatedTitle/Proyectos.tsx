"use client"
import { useState, useEffect } from 'react';
const TitleProyectos = () => {
  const [text, setText] = useState('');
  const fullText = 'Mis proyectos';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 text-center">
      {text}
      <span className="animate-blink">|</span>
    </h1>
  );
};

export default TitleProyectos;