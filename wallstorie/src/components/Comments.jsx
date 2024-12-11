import React, { useState } from "react";

const CommentSection = () => {
  const comments = [
    {
      id: 1,
      name: "Sneha Aggarwal",
      location: "Hyderabad, India",
      comment:
        "Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!",
      imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
    },
    {
      id: 2,
      name: "Asif Ali",
      location: "Bangalore, India",
      comment:
        "Exceptional service! From the initial consultation to the final reveal, your team demonstrated professionalism and a keen eye for design. Highly recommend!",
      imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
    },
    // Add more comments here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? comments.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-4 h-screen">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
        What Our Customers Say About Us
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Background Image */}
        <img
          src="https://via.placeholder.com/800x400" // Replace this with your background image URL
          alt="Background"
          className="absolute top-0 left-0 w-full h-[400px] object-cover rounded-lg shadow-lg "
        />

        {/* Comment Card */}
        <div
          className="relative z-10 w-10/12 lg:w-8/12 bg-green-50 bg-opacity-90 p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform flex justify-center items-center mx-auto"
          key={comments[currentIndex].id}
        >
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <img
              src={comments[currentIndex].imgSrc}
              alt={comments[currentIndex].name}
              className="w-12 h-12 rounded-full shadow-md"
            />
            {/* Comment Content */}
            <div>
              <p className="text-gray-700 italic mb-4">
                "{comments[currentIndex].comment}"
              </p>
              <p className="font-bold text-green-900">
                {comments[currentIndex].name}
              </p>
              <p className="text-sm text-gray-500">
                {comments[currentIndex].location}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 lg:left-5 p-3 bg-green-200 rounded-full shadow-md hover:bg-green-300 transition-colors z-20"
          onClick={goToPrev}
        >
          &#8592;
        </button>
        <button
          className="absolute right-2 lg:right-5 p-3 bg-green-200 rounded-full shadow-md hover:bg-green-300 transition-colors z-20"
          onClick={goToNext}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
