import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    { id: 1, src: "./src/assets/slider/Kidsroom.png", title: "Kids room" },
    { id: 2, src: "./src/assets/slider/Livingroom.png", title: "Living room" },
    { id: 3, src: "./src/assets/slider/Kitchen.png", title: "Kitchen" },
    { id: 4, src: "./src/assets/slider/Pooja.png", title: "Pooja room" },
    { id: 5, src: "./src/assets/slider/Bedroom.png", title: "Bed room" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(goToNext, 10000); // Change slides every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-green-700">Shop By Category</h2>
        <p className="text-gray-700 mt-2 font-lato">
          Tailored Services to Elevate Your Space
        </p>
      </div>
      <div className="relative flex items-center justify-center w-3/4 overflow-hidden mt-8 p-10 mx-auto">
        {/* Carousel Container */}
        <div className="flex w-[90%] h-[500px] items-center justify-center relative ">
          {/* Slides */}
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`transition-transform duration-1000   ease-in-out transform 
              ${
                index === currentIndex
                  ? "scale-100 opacity-100 z-10"
                  : "scale-90 opacity-50 z-0"
              }
              transition-all delay-600`} // Adding delay for smoother transition
              style={{
                position: "absolute",
                left: `${50 + (index - currentIndex) * 30}%`, // Adjust positions dynamically
                transform: "translateX(-50%)",
              }}
            >
              <div className="relative w-[250px] h-[500px] bg-white rounded-t-full shadow-lg border-2 border-gray-200">
                <img
                  src={image.src}
                  alt={image.title}
                  className="object-cover w-full h-[85%] rounded-t-full"
                />
                <div className="absolute bottom-0 w-full bg-white text-center rounded-b-lg">
                  <p className="font-semibold text-lg py-2 flex justify-center items-center p-4">
                    {image.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-5 bg-green-100 p-3 shadow-md hover:bg-green-300 text-black z-50"
          onClick={goToPrev}
        >
          &#8592;
        </button>
        <button
          className="absolute right-5 bg-green-100 p-3 shadow-md text-black z-50"
          onClick={goToNext}
        >
          &#8594;
        </button>
      </div>
    </>
  );
};

export default Carousel;
