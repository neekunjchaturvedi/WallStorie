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
    {
      id: 3,
      name: "Riya Sharma",
      location: "Delhi, India",
      comment:
        "The designs were stunning, and the entire process was so smooth. My living room has never looked better!",
      imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
    },
    {
      id: 4,
      name: "Arjun Kapoor",
      location: "Mumbai, India",
      comment:
        "Brilliant team and excellent execution! I’m thrilled with how my home turned out.",
      imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % comments.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? comments.length - 2
        : (prevIndex - 2 + comments.length) % comments.length
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-4 h-[500px] relative my-10">
      <div className="relative h-full">
        {/* Background Image */}
        <img
          src="src/assets/image.png" // Replace this with your background image URL
          alt="Background"
          className="absolute top-0 left-0 w-1/4 h-full object-cover rounded-lg shadow-lg"
        />
        <h2 className="absolute inset-10 left-1/2 text-3xl font-bold text-green-700 text-left  text-4xl">
          What Our Customers Say About Us
        </h2>

        {/* Comment Cards */}
        <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
          {[0, 1].map((offset) => {
            const commentIndex = (currentIndex + offset) % comments.length;
            return (
              <div
                className="bg-green-50 bg-opacity-90 p-6 rounded-sm shadow-lg flex justify-center items-center w-80 lg:w-96"
                key={comments[commentIndex].id}
              >
                <div className="flex items-start space-x-4">
                  {/* Profile Image */}
                  <img
                    src={comments[commentIndex].imgSrc}
                    alt={comments[commentIndex].name}
                    className="w-12 h-12 rounded-full shadow-md"
                  />
                  {/* Comment Content */}
                  <div>
                    <p className="text-gray-700 italic mb-4 font-lato">
                      "{comments[commentIndex].comment}"
                    </p>
                    <p className="font-bold text-green-900">
                      {comments[commentIndex].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {comments[commentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-5 left-64 flex space-x-4 z-10">
          <button
            className="p-3 bg-green-200 hover:bg-green-300 w-12 transition-colors text-black"
            onClick={goToPrev}
          >
            &#8592;
          </button>
          <button
            className="p-3 bg-green-200 w-12 hover:bg-green-300 transition-colors text-black"
            onClick={goToNext}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
