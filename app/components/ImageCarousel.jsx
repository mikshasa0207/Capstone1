'use client';

import { useState, useEffect } from 'react';

const images = [
  '/carousel/fashion1.jpg',
  '/carousel/fashion2.jpg',
  '/carousel/fashion3.jpg',
  '/carousel/fashion4.jpg',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change every 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div
            key={image}
            className="min-w-full h-full relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-black/60" /> {/* Increased overlay opacity */}
          </div>
        ))}
      </div>
    </div>
  );
}
