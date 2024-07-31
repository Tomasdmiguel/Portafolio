"use client";

import { useState } from "react";

const videos = [
  { id: 1, src: "/videos/reserva.mp4" },
 
];

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const index = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-2x2 mx-auto mt-10">
       <h1 className="text-center text-2xl font-semibold mb-4">Destacado</h1>
      <div className="overflow-hidden rounded-lg shadow-lg">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`transition-transform duration-500 ease-in-out transform ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}>
            {index === currentIndex && (
              <video className="w-full h-auto" controls>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full border border-gray-300 shadow-md transition-transform duration-300 hover:bg-gray-100 hover:shadow-lg">
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full border border-gray-300 shadow-md transition-transform duration-300 hover:bg-gray-100 hover:shadow-lg">
        &gt;
      </button> */}
    </div>
  );
};

export default Carrusel;
