import React, { useState, useRef, useEffect } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const images = [
    {
      src: "/src/assets/wallpaperimages/union1.png",
      alt: "Living Room",
      label: "Living Room",
    },
    {
      src: "/src/assets/wallpaperimages/union1.png",
      alt: "Kids Room",
      label: "Kids Room",
    },
    {
      src: "/src/assets/wallpaperimages/union1.png",
      alt: "Bed Room",
      label: "Bed Room",
    },
    {
      src: "/src/assets/wallpaperimages/union1.png",
      alt: "Pooja Room",
      label: "Pooja Room",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0].offsetWidth;
      sliderRef.current.style.transform = `translateX(-${
        currentSlide * slideWidth
      }px)`;
    }
  }, [currentSlide]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        ref={sliderRef}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-none w-full sm:w-1/2 md:w-1/3 px-4">
            <div className="relative bg-gray-200 rounded-lg shadow-md overflow-hidden h-[400px]">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-white p-2 rounded-md text-green-600">
                {image.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full z-10"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full z-10"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
