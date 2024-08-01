"use client";

import { useState } from "react";

const videos = [
  { id: 1, src: "/videos/Reserva.mp4" },
 
];

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  

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
     
    </div>
  );
};

export default Carrusel;
